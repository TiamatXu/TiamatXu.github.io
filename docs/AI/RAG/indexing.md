# 索引构建 Indexing

> **索引构建**是 RAG 的离线预处理阶段：把原始文档变成“机器能按语义快速检索”的结构。管线上游的质量上限在这里就被决定了——分块切坏了，后面检索和生成怎么调都救不回来。

## 流程总览

```text
数据收集 → 清洗 → 分块 (Chunking) → 向量化 (Embedding) → 向量库存储
```

## 数据收集与清洗

| 来源 | 示例 | 常用工具 |
|:---|:---|:---|
| 文档 | PDF、Word、Markdown | PyMuPDF、python-docx、Unstructured |
| 网页 | 官网、Wiki、博客 | requests + BeautifulSoup、Firecrawl |
| 数据库 | 业务库、数仓 | 各数据库驱动 |
| 表格 | Excel、CSV | Pandas |

清洗要点：去除页眉页脚/广告等噪声、统一编码、**保留结构信息** (标题层级、表格边界)——结构是后续语义分块的重要依据。PDF 解析是最大的脏活，表格和双栏排版尤其容易碎掉，值得单独投入。各格式的完整处理方案与代码见[多格式文档解析](./document-parsing)。

## 分块 (Chunking)

分块的目标是让每个 chunk **语义完整且聚焦**：太大则检索不精确、无关内容稀释上下文；太小则语义残缺。

| 策略 | 做法 | 适用 |
|:---|:---|:---|
| 固定大小 + 重叠 | 按字符/token 数滑窗切分 | 结构松散的纯文本,兜底方案 |
| 递归字符分块 | 按分隔符优先级 (段落 → 句子) 递归切 | 通用默认选择 |
| 结构感知分块 | 按标题/章节/表格边界切 | Markdown、HTML、财报等结构化文档 |
| 语义分块 | 按相邻句向量相似度突变点切 | 高价值语料,成本较高 |

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=75,  # 约 15%,避免关键信息被切断
    separators=["\n\n", "\n", "。", "！", "？", "，"],
)
chunks = splitter.split_text(document)
```

经验值：chunk 大小 200~500 token，重叠取 10%~20%。四种策略的完整实现与表格处理见[分块实战](./chunking-in-practice)，更进一步的做法 (摘要索引、父子块、上下文增强) 见[索引存储优化](./indexing-optimization)。

## 向量化 (Embedding)

用 Embedding 模型把每个 chunk 编码成高维向量，语义相近的文本在向量空间中彼此靠近——这是[向量检索](./vector-retrieval)的基础。

选型看三点：**榜单效果** (MTEB / 中文看 C-MTEB)、**维度与成本** (维度越高存储与计算越贵)、**语言匹配** (中文语料选中文优化模型)。

| 模型 | 维度 | 特点 |
|:---|:---|:---|
| OpenAI text-embedding-3-large | 3072 | 效果强,支持降维截断 |
| OpenAI text-embedding-3-small | 1536 | 性价比高的通用选择 |
| BGE-M3 | 1024 | 开源,中文强,同时输出稠密/稀疏向量 |
| Qwen3-Embedding | 可变 | 开源,多语言榜单前列 |

> 注意：**换 Embedding 模型必须全量重建索引**——不同模型的向量空间互不兼容。选型时把“未来迁移成本”也算进去。

## 向量存储

普通数据库只会精确匹配，向量数据库靠 ANN 索引 (HNSW、IVF) 在千万级向量中做毫秒级近似最近邻搜索，算法细节见[向量检索](./vector-retrieval)。

- **Milvus / Qdrant / Weaviate**：开源自建，功能全，支持混合检索与元数据过滤
- **Pinecone**：全托管云服务，省运维
- **pgvector / Elasticsearch**：在已有技术栈上加向量能力，中小规模最务实
- **FAISS / Chroma**：本地库，适合原型与离线实验

::: details e.g. 财务问答 Agent 的索引决策
年报 PDF 用结构感知分块 (按章节 + 表格边界)，制度文档用递归字符分块；每个 chunk 挂上元数据 (公司、年份、章节、密级) 供[规则过滤](./rule-based-retrieval)使用；Embedding 选 BGE-M3——中文财务语料、需要私有化部署，顺带获得稀疏向量支持混合检索。
:::

## 参考

- [Chunking Strategies (Pinecone)](https://www.pinecone.io/learn/chunking-strategies/)
- [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
