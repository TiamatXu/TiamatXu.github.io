# 检索实战

> [检索](./retrieval)篇给出了“混合召回 + 重排序”的架构，本文把它落成一条完整可运行的管线：BM25 与向量双路召回 → RRF 融合 → Cross-Encoder 重排序 → 阈值拒答。全部用本地开源组件，无外部服务依赖。

## 准备：双路索引

```python
import chromadb, jieba
from rank_bm25 import BM25Okapi

docs  = [c["text"] for c in chunks]       # 来自分块环节
metas = [c["metadata"] for c in chunks]

# 向量索引 (Chroma 内置 Embedding,生产替换为 BGE-M3 等)
client = chromadb.Client()
col = client.create_collection("kb", metadata={"hnsw:space": "cosine"})
col.add(documents=docs, metadatas=metas, ids=[str(i) for i in range(len(docs))])

# BM25 索引 (中文先分词)
bm25 = BM25Okapi([list(jieba.cut(d)) for d in docs])
```

## 第一段：双路召回 + RRF 融合

```python
import numpy as np

def recall(query: str, top_n: int = 50) -> list[int]:
    # 路 1:向量召回
    vec_hits = col.query(query_texts=[query], n_results=top_n)
    vec_rank = [int(i) for i in vec_hits["ids"][0]]

    # 路 2:BM25 召回
    scores = bm25.get_scores(list(jieba.cut(query)))
    bm_rank = list(np.argsort(scores)[::-1][:top_n])

    # RRF 融合:两路都靠前的文档得分最高
    rrf = {}
    for rank_list in (vec_rank, bm_rank):
        for r, doc_id in enumerate(rank_list):
            rrf[doc_id] = rrf.get(doc_id, 0) + 1 / (60 + r + 1)
    return sorted(rrf, key=rrf.get, reverse=True)[:top_n]
```

## 第二段：重排序 + 阈值拒答

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")

def retrieve(query: str, top_k: int = 5, min_score: float = 0.3):
    candidates = recall(query)
    pairs = [(query, docs[i]) for i in candidates]
    scores = reranker.predict(pairs)

    ranked = sorted(zip(scores, candidates), reverse=True)[:top_k]
    ranked = [(s, i) for s, i in ranked if s >= min_score]  # 低于阈值的不要
    if not ranked:
        return None  # 触发拒答:“知识库中未找到相关内容”
    return [{"text": docs[i], "score": float(s), **metas[i]} for s, i in ranked]
```

拒答阈值 `min_score` 不要拍脑袋：拿 50 个“知识库里确实没有答案”的问题跑一遍，取能拦住 95% 无关结果的分数。**宁可说“没找到”，不能硬塞不相关证据**——那是幻觉的直接原料。

## 加上元数据过滤

权限、时效等硬约束在**召回前**收窄 (机制见[规则过滤检索](./rule-based-retrieval))：

```python
vec_hits = col.query(
    query_texts=[query], n_results=50,
    where={"$and": [{"year": {"$gte": 2024}}, {"department": {"$eq": "finance"}}]},
)
# BM25 侧:先按同条件筛出候选 id 集合,再在子集上打分
```

注意 BM25 库没有内置过滤，要自己先筛语料子集；两路的过滤条件必须一致，否则融合结果会偏。

## 完整调用链

```python
result = retrieve("2023 年 EBITDA 是多少?")
if result is None:
    answer = "知识库中未找到相关内容。"
else:
    context = "\n\n".join(f"[{i+1}] ({r['source']} 第{r['page']}页) {r['text']}"
                          for i, r in enumerate(result))
    answer = llm.invoke(PROMPT.format(context=context, question=query))
```

生成端的 Prompt 组装与引用核验见[生成](./generation)篇。

## 调优检查单

| 症状 | 先查什么 |
|:---|:---|
| 专有名词/编号查不到 | BM25 路是否生效,中文分词是否把词切碎了 |
| 换个说法就查不到 | 向量路权重,Embedding 模型是否太弱 |
| 相关文档召回了但排不进 Top-K | 重排序是否开启,召回 Top-N 是否太小 |
| 答案张冠李戴 | 元数据过滤是否缺失 (跨年份/跨主体混检) |
| 延迟太高 | 重排序候选数 (50 → 25)、reranker 换小模型 |

每一项改动都要过[检索评估](./retrieval-evaluation)的回归测试再上线，凭手感调参的结果通常是按下葫芦浮起瓢。

::: details e.g. 一次线上 bad case 的排查
用户反馈“查不到 2024 年 Q2 环比数据”。按检查单：BM25 命中了含“Q2”的块 ✅；重排序分数 0.21 低于阈值被拒答 ❌。根因：该块是表格被文本分块器切碎后的残片，语义不完整导致 reranker 打低分。修复走[分块实战](./chunking-in-practice)的表格单独成块方案，而不是调低阈值——阈值是防线，不是补丁。
:::

## 参考

- [Qdrant Hybrid Search](https://qdrant.tech/documentation/concepts/hybrid-queries/)
- [BGE-M3：一个模型同时输出稠密/稀疏向量](https://huggingface.co/BAAI/bge-m3)
