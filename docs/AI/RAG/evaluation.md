# 评估指标与框架 Evaluation

> 没有评估的 RAG 优化是碰运气：换个分块大小、加个重排序，到底变好还是变坏？**评估体系**把“感觉”变成“数字”，是所有 RAG 优化决策的前提——本系列每篇文章里的选型建议，最终都要靠它裁决。

## 评估的两个维度

RAG 是两段系统，必须分开归因：**检索没找对**还是**生成没答好**？

### 检索质量

| 指标 | 含义 | 敏感点 |
|:---|:---|:---|
| Recall@K | 前 K 条结果覆盖了多少相关文档 | 漏检 |
| Precision@K | 前 K 条中有多少真正相关 | 噪声 |
| MRR | 第一条相关结果的排名倒数 | 首位质量 |
| NDCG | 按位置加权的综合排序质量 | 整体排序 |

召回阶段盯 Recall@50 (漏了就再也找不回)，重排序阶段盯 NDCG@5 / MRR (最终喂给 LLM 的就这几条)。评估集构建、指标实现与消融实验的完整代码见[检索效果评估实战](./retrieval-evaluation)。

### 生成质量

| 指标 | 回答的问题 | 评估方式 |
|:---|:---|:---|
| Faithfulness | 答案是否只基于检索证据 | LLM 裁判逐句核对 |
| Answer Relevancy | 是否切题 | LLM 裁判 / 向量相似度 |
| Context Precision/Recall | 喂给 LLM 的证据本身质量如何 | 连接检索与生成的桥梁指标 |

## RAGAS 框架

[RAGAS](https://github.com/explodinggradients/ragas) 是最流行的端到端评估框架，用 LLM 作裁判自动打分：

```python
from ragas import evaluate, EvaluationDataset
from ragas.metrics import Faithfulness, AnswerRelevancy, ContextPrecision

dataset = EvaluationDataset.from_list([{
    "user_input": "2023 年公司净利润是多少?",
    "response": "归母净利润为 2.5 亿元 [1]",
    "retrieved_contexts": ["财报显示,2023 年度归母净利润 2.5 亿元。"],
    "reference": "2.5 亿元",
}])

result = evaluate(dataset, metrics=[Faithfulness(), AnswerRelevancy(), ContextPrecision()])
```

同类工具：**TruLens** (RAG Triad 三角评估)、**DeepEval** (pytest 风格，适合接入 CI)、**Phoenix/Arize** (评估 + 链路追踪一体)。

> LLM 裁判本身会出错：换裁判模型分数会漂移、对长答案有偏好。关键结论要抽样人工复核，别把裁判分当真理。

## 评估数据集

- **金标准集**：人工整理“问题 → 标准答案 → 相关文档”三元组，100~300 条即可支撑回归测试，质量重于数量
- **合成数据**：RAGAS 等支持从语料自动生成问答对，快速冷启动，但要人工抽检剔除低质量样本
- **线上信号**：用户点踩、追问率、转人工率，是离线指标之外的真实反馈

## 工程实践

1. **先建评估集，再做优化**——顺序反了，一切调参都是盲调
2. **回归测试**：改分块、换 Embedding、调 Prompt 后全量重跑，防止 A 处优化 B 处劣化
3. **接入 CI**：评估分数低于阈值就阻断上线 (DeepEval 天然支持)
4. **分段归因**：先看 Context 指标定位是检索问题还是生成问题，再去对应环节调优——检索差就回[检索](./retrieval)与[查询优化](./query-optimization)，生成差就回[生成](./generation)

::: details e.g. 一次真实的优化决策
财务问答系统 Faithfulness 只有 0.72。分段归因发现 Context Precision 仅 0.55——问题在检索不在生成。加重排序后 Context Precision 升到 0.83,Faithfulness 随之到 0.91，全程没动生成端一行代码。没有分段指标，大概率会先去改 Prompt，白忙一场。
:::

## 参考

- [RAGAS 文档](https://docs.ragas.io/)
- [DeepEval](https://github.com/confident-ai/deepeval)
- [TruLens RAG Triad](https://www.trulens.org/getting_started/core_concepts/rag_triad/)
