# 检索 Retrieval

> **检索**是 RAG 的在线核心环节：从知识库中召回与用户问题最相关的证据。2026 年生产环境的基线不再是单一向量检索，而是“**混合召回 + 重排序**”两段式架构。

## 两段式架构

```text
用户问题 → ┬─ 向量检索 (语义召回) ─┐
           └─ BM25 检索 (词项召回) ─┴→ 融合 (RRF) → 重排序 (Cross-Encoder) → Top-K 证据
```

第一段**召回** (Recall) 追求“别漏”，快速从海量文档中捞出候选集；第二段**重排序** (Rerank) 追求“排准”，用更贵的模型精挑细选。

## 第一段：混合召回

单路检索各有盲区，互补才稳：

- **向量检索**：捕捉语义相似，同义改写也能命中，但专有名词、错误码、编号容易漏，详见[向量检索](./vector-retrieval)
- **BM25 关键词检索**：精确匹配词项，专有名词命中稳定，但换个说法就查不到，详见[布尔检索](./boolean-retrieval)

两路结果用 **RRF** (Reciprocal Rank Fusion，倒数排名融合) 合并：文档在任一路里排名越靠前得分越高，在多路中都出现的文档被置顶，无需调权重就很稳健。

```python
def rrf(rankings: list[list[str]], k: int = 60) -> dict[str, float]:
    scores = {}
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)
    return dict(sorted(scores.items(), key=lambda x: -x[1]))
```

除向量与关键词外，关系密集的场景还可以引入[知识图谱检索](./knowledge-graph-retrieval)；权限、时效等硬约束则由[规则过滤](./rule-based-retrieval)在召回前强制收窄候选集。

## 第二段：重排序

召回阶段用的双编码器 (Bi-Encoder) 把查询和文档**分别**编码，快但精度有限；重排序用**交叉编码器** (Cross-Encoder) 把“查询 + 文档”拼在一起过模型，逐对精细打分：

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")
pairs = [(query, doc) for doc in candidates]      # 召回的 50~100 条候选
scores = reranker.predict(pairs)
top_docs = [d for _, d in sorted(zip(scores, candidates), reverse=True)][:5]
```

典型配比：召回取 Top 50~100，重排后只保留 Top 3~10 交给生成。重排序模型可选 BGE-Reranker (开源) 或 Cohere Rerank (API)。

## 关键参数

| 参数 | 建议 | 说明 |
|:---|:---|:---|
| 召回 Top-N | 50~100 | 给重排序留足候选,漏了就再也找不回来 |
| 最终 Top-K | 3~10 | 交给 LLM 的证据数,多了稀释注意力 |
| 相似度阈值 | 按数据集校准 | 低于阈值宁可返回“未找到”,也别硬塞不相关内容 |

## 常见问题

- **召回了但排不上**：Top-K 太小或没做重排序，先加重排序
- **专有名词查不到**：纯向量检索的典型症状，补 BM25 混合召回
- **问题太模糊导致召回差**：在检索前做[查询优化](./query-optimization) (改写、分解、HyDE)
- **多数据源不知道查哪个**：上[路由](./routing-query-construction)

::: details e.g. 财务问答 Agent 的检索链路
问题“中芯国际 2023 年报中的 EBITDA 是多少？”——BM25 精确命中“EBITDA”“2023”，向量检索补充“息税折旧摊销前利润”等同义表述的段落，RRF 融合后 80 条候选，重排序把包含具体数值表格的片段推到前 3，连同页码元数据交给生成环节。
:::

## 参考

- [RRF 论文](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf)
- [BGE-Reranker](https://huggingface.co/BAAI/bge-reranker-v2-m3)
- [Pinecone: Rerankers and Two-Stage Retrieval](https://www.pinecone.io/learn/series/rag/rerankers/)
