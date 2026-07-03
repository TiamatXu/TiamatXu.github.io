# 分块实战

> [索引构建](./indexing)讲了分块的“为什么”，本文解决“怎么切”：四种策略的完整实现、结构化文档 (表格) 的特殊处理、父子块落地，以及切完之后怎么向量化入库。原则始终是一条：**每个 chunk 语义完整且聚焦，并携带足够的元数据自证出身**。

## 策略一：固定大小 + 重叠 (兜底方案)

按 token 数而不是字符数切——Embedding 模型的窗口以 token 计：

```python
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")

def fixed_chunk(text: str, size: int = 400, overlap: int = 60) -> list[str]:
    tokens = enc.encode(text)
    chunks = []
    for i in range(0, len(tokens), size - overlap):
        chunks.append(enc.decode(tokens[i : i + size]))
    return chunks
```

只在文本毫无结构 (聊天记录、OCR 碎片) 时使用，重叠取 10%~20% 防止关键句被拦腰切断。

## 策略二：递归分块 (通用默认)

按分隔符优先级递归切分，优先在段落边界断开，段落太长再退到句子：

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500, chunk_overlap=75,
    separators=["\n\n", "\n", "。", "；", "，", ""],  # 中文分隔符
    length_function=lambda t: len(enc.encode(t)),      # 按 token 计长
)
chunks = splitter.split_text(document)
```

## 策略三：结构感知分块 (结构化文档首选)

Markdown/Word/HTML 已经有标题层级，**按结构切，并把标题路径写回每个块**——这是结构化文档分块的核心动作：

```python
from langchain_text_splitters import MarkdownHeaderTextSplitter

md_splitter = MarkdownHeaderTextSplitter(
    headers_to_split_on=[("#", "h1"), ("##", "h2"), ("###", "h3")]
)
sections = md_splitter.split_text(markdown_doc)

for sec in sections:
    bc = " > ".join(sec.metadata.get(k) for k in ("h1", "h2", "h3") if sec.metadata.get(k))
    sec.page_content = f"[{bc}]\n{sec.page_content}"  # 面包屑拼进正文,一起向量化
    # 超长小节内部再用递归分块二次切分
```

面包屑拼进正文再向量化，块内的“该公司”“本季度”等指代就有了着落——这是[上下文增强](./indexing-optimization)的轻量版，零 LLM 成本。

## 策略四：语义分块 (高价值语料)

在相邻句子向量相似度的“突变点”处断开：

```python
import numpy as np

def semantic_chunk(sentences: list[str], embed, threshold_pct: int = 20) -> list[str]:
    vecs = embed(sentences)  # 逐句向量化
    sims = [float(np.dot(vecs[i], vecs[i + 1])) for i in range(len(vecs) - 1)]
    cut = np.percentile(sims, threshold_pct)   # 相似度最低的 20% 位置作为切点
    chunks, cur = [], [sentences[0]]
    for i, sim in enumerate(sims):
        if sim < cut:
            chunks.append("".join(cur)); cur = []
        cur.append(sentences[i + 1])
    return chunks + ["".join(cur)]
```

逐句 Embedding 有成本，只用于高价值、无结构标记的语料。

## 结构化文档：表格的分块与向量化

表格**绝不能**被文本分块器拦腰切开，单独成块、双份索引：

```python
def index_table(table_md: str, caption: str, llm, collection):
    # 1. 表格整块保留,生成一句话摘要
    summary = llm.invoke(f"用一句话概括此表格的内容与用途:\n{table_md}")
    # 2. 摘要向量化用于检索,原表存在元数据里,命中后返回原表
    collection.add(
        documents=[f"{caption}。{summary}"],
        metadatas=[{"type": "table", "raw_table": table_md}],
        ids=[f"table-{hash(table_md)}"],
    )
```

这是[多表示索引](./indexing-optimization)在表格上的应用：摘要负责“被找到”，原表负责“被读懂”。行数很多的明细表，再补一份行级文本化 (见[文档解析](./document-parsing)的 Excel 策略)。

## 父子块的落地实现

```python
parent_store = {}  # 生产环境用 Redis / 文档库

for p_id, parent in enumerate(recursive_split(doc, size=2000)):
    parent_store[p_id] = parent
    children = recursive_split(parent, size=400)
    collection.add(
        documents=children,                      # 子块向量化,检索用
        metadatas=[{"parent_id": p_id}] * len(children),
        ids=[f"{p_id}-{i}" for i in range(len(children))],
    )

def retrieve(query: str, k: int = 5) -> list[str]:
    hits = collection.query(query_texts=[query], n_results=k * 3)
    parent_ids = list(dict.fromkeys(m["parent_id"] for m in hits["metadatas"][0]))
    return [parent_store[pid] for pid in parent_ids[:k]]  # 命中子块,返回父块
```

## 向量化入库

```python
# 批量 embed + 元数据齐全,一次到位
collection.add(
    documents=[c.text for c in chunks],
    metadatas=[{"source": c.source, "page": c.page, "breadcrumb": c.breadcrumb,
                "year": c.year, "department": c.dept} for c in chunks],
    ids=[c.id for c in chunks],
)
```

- **批量调用** Embedding API (每批 64~256 条)，逐条调用慢一个数量级
- 元数据字段在入库时想全：page/source 供引用，year/department 供[规则过滤](./rule-based-retrieval)，缺了事后补要全量重跑
- chunk `id` 用“文档指纹 + 序号”，增量更新时按文档删旧插新

## 策略选型速查

| 文档形态 | 推荐策略 |
|:---|:---|
| Markdown/Word 等有标题结构 | 结构感知 + 超长小节递归二切 |
| 纯文本、结构松散 | 递归分块 |
| 含表格 | 表格单独成块 + 摘要索引 |
| 长报告、需大上下文生成 | 父子块 |
| 高价值无结构语料 | 语义分块 |

> 切完别急着上线：抽 20 个 chunk 人眼看一遍“单独读是否成立”，再用[检索评估](./retrieval-evaluation)对比不同 chunk_size 的 Recall@K——分块参数是实验问题，不是玄学问题。

## 参考

- [LangChain Text Splitters](https://python.langchain.com/docs/concepts/text_splitters/)
- [Greg Kamradt: 5 Levels of Text Splitting](https://github.com/FullStackRetrieval-com/RetrievalTutorials/blob/main/tutorials/LevelsOfTextSplitting/5_Levels_Of_Text_Splitting.ipynb)
