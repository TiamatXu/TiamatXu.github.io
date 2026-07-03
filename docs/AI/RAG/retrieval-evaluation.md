# 检索效果评估实战

> [评估指标与框架](./evaluation)篇给了指标定义，本文解决三个实操问题：**评估集从哪来、指标怎么算、实验怎么设计**。检索评估不需要 LLM 裁判——命中就是命中，没命中就是没命中，它是 RAG 里最便宜、最客观、最该先做的评估。

## 第一步：构建评估集

评估集 = 一批“问题 → 应命中的 chunk id”标注对。两个来源：

### 人工标注 (质量基准)

领域专家出 50~100 个真实问题，在知识库里找出每个问题的相关 chunk。贵但必须有——它是校准合成数据质量的锚点。

### LLM 合成 (规模扩充)

反向生成：给 LLM 看一个 chunk，让它出“这个 chunk 能回答的问题”，chunk id 天然就是标准答案：

```python
import json, random

def synthesize_eval_set(docs: list[str], llm, n: int = 200) -> list[dict]:
    cases = []
    for idx in random.sample(range(len(docs)), n):
        q = llm.invoke(
            "根据以下内容出一个用户可能问的问题。要求:问题脱离原文也能看懂,"
            f"不要出现“本文”“上述”等指代。\n内容:{docs[idx]}\n只输出问题。"
        )
        cases.append({"question": q.strip(), "relevant_ids": [idx]})
    return cases

eval_set = synthesize_eval_set(docs, llm)
json.dump(eval_set, open("eval_set.json", "w"), ensure_ascii=False)
```

合成集要**人工抽检 10%**：剔除“问题与 chunk 貌合神离”的坏样本。另外注意合成问题措辞往往贴近原文，会高估检索效果——人工集的分数才是底线。

## 第二步：指标实现

三个核心指标，手写不过 20 行，不依赖任何框架：

```python
def recall_at_k(retrieved: list[int], relevant: list[int], k: int) -> float:
    return len(set(retrieved[:k]) & set(relevant)) / len(relevant)

def mrr(retrieved: list[int], relevant: list[int]) -> float:
    for rank, doc_id in enumerate(retrieved, 1):
        if doc_id in relevant:
            return 1 / rank
    return 0.0

def ndcg_at_k(retrieved: list[int], relevant: list[int], k: int) -> float:
    import numpy as np
    dcg = sum(1 / np.log2(r + 2) for r, d in enumerate(retrieved[:k]) if d in relevant)
    idcg = sum(1 / np.log2(r + 2) for r in range(min(len(relevant), k)))
    return dcg / idcg if idcg else 0.0
```

## 第三步：批量评估

```python
import numpy as np

def evaluate(search_fn, eval_set: list[dict], k: int = 5) -> dict:
    r, m, n = [], [], []
    for case in eval_set:
        retrieved = search_fn(case["question"])       # 返回 chunk id 列表
        r.append(recall_at_k(retrieved, case["relevant_ids"], k))
        m.append(mrr(retrieved, case["relevant_ids"]))
        n.append(ndcg_at_k(retrieved, case["relevant_ids"], k))
    return {f"Recall@{k}": np.mean(r), "MRR": np.mean(m), f"NDCG@{k}": np.mean(n)}
```

## 第四步：消融实验

评估的价值在**对比**：固定评估集，逐个开关组件，看每一层带来多少提升：

```python
experiments = {
    "纯向量":        lambda q: vector_only(q),
    "纯 BM25":       lambda q: bm25_only(q),
    "混合 (RRF)":    lambda q: recall(q)[:5],
    "混合 + 重排序":  lambda q: [r["id"] for r in retrieve(q)],
}
for name, fn in experiments.items():
    print(name, evaluate(fn, eval_set))
```

典型输出形如：

| 配置 | Recall@5 | MRR | NDCG@5 |
|:---|:---|:---|:---|
| 纯向量 | 0.71 | 0.58 | 0.62 |
| 纯 BM25 | 0.64 | 0.55 | 0.58 |
| 混合 (RRF) | 0.82 | 0.66 | 0.71 |
| 混合 + 重排序 | 0.85 | 0.79 | 0.81 |

读法：混合召回主要抬 **Recall** (少漏)，重排序主要抬 **MRR/NDCG** (排准)。哪层没带来提升，就别为它付延迟和成本——这就是[检索实战](./retrieval-in-practice)里所有选型建议的裁决方式。chunk_size、Embedding 模型、Top-N 等参数同理，一次只动一个变量。

## 第五步：错误分析

分数只告诉你“有多差”，bad case 才告诉你“差在哪”：

```python
bad = [c for c in eval_set
       if recall_at_k(search_fn(c["question"]), c["relevant_ids"], 5) == 0]
```

逐条看 bad case，归因通常落在四类：**分块问题** (目标块被切碎/表格残片) → 回[分块实战](./chunking-in-practice)；**词汇鸿沟** (口语 vs 术语) → 上[查询优化](./query-optimization)；**Embedding 盲区** (专有名词) → 查 BM25 路；**标注错误** → 修评估集。

> 把 `evaluate` 挂进 CI：检索配置的任何改动，评估分数低于基线 2 个点就阻断合并。检索质量从此不再靠“感觉最近变差了”来发现。

## 参考

- [RAGAS 合成测试集生成](https://docs.ragas.io/en/stable/getstarted/rag_testset_generation/)
- [BEIR 检索评估基准](https://github.com/beir-cellar/beir)
