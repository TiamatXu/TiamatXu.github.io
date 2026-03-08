# 效果评估 Evaluation

如何知道你的 RAG 系统到底靠不靠谱？我们需要一套客观、量化的指标体系来衡量。

## 评估维度 1：检索质量

主要评估系统是否找回了正确的“素材”。

- **Recall@K (召回率)**：前 K 个结果中包含了多少真实相关的文档。
- **Precision@K (准确率)**：检索到的文档中有多少是真正相关的。
- **MRR (平均倒数排名)**：第一个正确答案排在第几位。排得越靠前，分值越高。
- **NDCG**：一种综合考虑排名顺序和相关程度的指标。

::: details e.g. 财务问答检索测试
- **场景**：测试 100 个关于“财务风险点”的问题。
- **目标**：Recall@5 达到 90% 以上，即 90% 的问题在前 5 条检索结果中能找到答案依据。
:::

## 评估维度 2：生成质量

主要评估 LLM 生成的答案是否准确、有据、切题。

- **Faithfulness (忠实度)**：答案是否完全来源于检索到的文档，有没有凭空编造事实 (幻觉)。
- **Relevance (答案相关性)**：答案是否直接回答了用户的问题，有没有答非所问。
- **Groundedness (有据性)**：答案中的每一个核心观点是否都能在参考文档中找到原文出处。

## RAGAS 评估框架

[RAGAS](https://github.com/explodinggradients/ragas) 是目前最流行的端到端 RAG 评估工具，它使用 LLM 作为裁判，自动计算上述指标。

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

# 准备测试集
data = {
    "question": ["2023年公司的净利润是多少？"],
    "answer": ["2.5亿元"],
    "contexts": [["财报显示，公司2023年度实现归属于上市公司股东的净利润为2.5亿元。"]],
    "ground_truths": ["2.5亿元"]
}

# 自动跑分
result = evaluate(data, metrics=[faithfulness, answer_relevancy])
print(result)
```

## 评估流程最佳实践

1. **构建金标准数据集**：人工整理一份“问题 - 标准答案 - 对应文档”的基准库。
2. **端到端测试**：不仅测检索，也要测生成的最终效果。
3. **回归测试**：每当修改分块大小、换了 Embedding 模型或调整了 Prompt 后，都要重新运行评估，防止性能倒退。
