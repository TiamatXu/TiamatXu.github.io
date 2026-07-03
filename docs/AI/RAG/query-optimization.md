# 查询优化 Query Optimization

> 用户的原始提问往往模糊、简短、带多重意图，直接拿去检索是 Naive RAG 效果差的头号原因。**查询优化**在检索之前对问题做改写、扩展或分解——花一次便宜的 LLM 调用，换检索召回率的显著提升。

## 技术总览

| 技术 | 一句话 | 解决的问题 |
|:---|:---|:---|
| Multi Query | 一个问题生成多种问法并行检索 | 单一表述与文档措辞不匹配 |
| RAG-Fusion | Multi Query + RRF 融合排序 | 多路结果如何科学合并 |
| Decomposition | 复杂问题拆成子问题逐个检索 | 多跳、复合型问题 |
| Step Back | 先检索更抽象的背景知识 | 具体问题需要通用原理支撑 |
| HyDE | 用假设答案的向量去检索 | 问题与答案的向量空间不对齐 |

## 多查询 (Multi Query) 与 RAG-Fusion

让 LLM 把原始问题改写成 3~5 个语义相同、表述不同的变体，并行检索后合并：

```python
variants = llm.invoke(
    f"将以下问题改写成 3 个语义相同但表述不同的检索查询,每行一个:\n{question}"
).splitlines()

rankings = [vectorstore.search(q) for q in [question, *variants]]
merged = rrf(rankings)   # RRF 实现见《检索》篇
```

RAG-Fusion 就是“Multi Query + RRF”：在多个查询变体的结果中都排名靠前的文档被置顶，单一表述带来的偏差被平均掉。

## 问题分解 (Decomposition)

复合问题没法一次检索命中，先拆再查：

- 原问题：“对比北京和上海分公司近三年销售额趋势并分析原因”
- 子问题：① 北京近三年销售数据 ② 上海近三年销售数据 ③ 两地市场差异因素
- 每个子问题独立检索、独立回答，最后由 LLM 汇总——这也是 [Agentic RAG](./sophisticated-rag) 中多步检索的雏形

## 问题回退 (Step Back)

具体问题先“退一步”检索通用原理：问“某公司 2023 年 Q4 流动比率是多少”，先检索“流动比率的定义与计算公式”，原理与数据两路证据一起交给生成。适合“需要背景知识才能正确解读数据”的场景。

## 假设性文档嵌入 (HyDE)

先让 LLM 凭空写一个“假设答案”，再用假设答案的向量去检索真实文档：

```python
fake_answer = llm.invoke(f"假设性地回答以下问题(允许不准确):{question}")
real_docs = vectorstore.search(fake_answer)   # 用答案找答案
```

原理：“答案与答案”的向量相似度远高于“问题与答案”。问题是疑问句、短；文档是陈述句、长——两者在向量空间天然不对齐，HyDE 用假设文档桥接了这个鸿沟。代价是多一次 LLM 调用，且假设答案彻底跑偏时会引入噪声。

## 选型建议

- 默认先上 **Multi Query / RAG-Fusion**：实现最简单，收益稳定
- 问题明显是复合型 → **Decomposition**
- 领域知识密集 (公式、法规) → **Step Back**
- 问题与文档措辞差异极大 (口语问题查术语文档) → **HyDE**
- 这些技术可以组合，但每加一层就多一次 LLM 调用与延迟——是否值得，用[评估](./evaluation)数据说话，而不是全都堆上

::: details e.g. 财务问答 Agent 的查询优化
用户问“公司去年赚钱了吗？”——Multi Query 生成“2025 年度净利润”“2025 年经营业绩”“2025 损益表摘要”三个变体；“赚钱”这种口语在财报中几乎不出现，变体改写把它映射到了财务术语空间，召回率从“碰运气”变成“稳定命中”。
:::

## 参考

- [RAG-Fusion 项目](https://github.com/Raudaschl/rag-fusion)
- [HyDE 论文](https://arxiv.org/abs/2212.10496)
- [Step-Back Prompting 论文](https://arxiv.org/abs/2310.06117)
