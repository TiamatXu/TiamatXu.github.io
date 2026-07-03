# 介绍

> **RAG** (Retrieval-Augmented Generation，检索增强生成) 在生成答案之前，先从外部知识库检索相关证据，把“检索到的事实”和“用户问题”一起交给 LLM——让模型基于证据作答，而不是凭参数里的记忆发挥。

## 为什么需要 RAG

LLM 单独作答有三个结构性缺陷，RAG 逐一对应解决：

| LLM 的缺陷 | 表现 | RAG 的解法 |
|:---|:---|:---|
| 知识截止 | 训练数据之后的事一概不知 | 检索实时更新的知识库 |
| 幻觉 | 一本正经地编造事实 | 用检索到的证据约束生成 |
| 私有域盲区 | 不了解企业内部文档、业务数据 | 把私有语料建成索引 |

与两条替代路线相比：**重新训练**成本极高且赶不上知识更新频率；**微调**擅长注入“风格与能力”而不是“事实”。RAG 用“更新知识库”替代“更新模型”，还天然带来**可追溯性**——每个结论都能标注来源。

## 核心流程

RAG 分为离线和在线两个阶段：

```text
离线 (Indexing)：数据源 → 清洗 → 分块 → 向量化 → 入库
在线 (Query)：  用户问题 → (查询优化) → 检索 → 重排序 → 构建 Prompt → LLM 生成 → 后处理
```

1. **索引构建**：把 PDF、数据库、网页等原始数据切成语义完整的块并建立索引，见[索引构建](./indexing)
2. **检索**：召回与问题最相关的 Top-K 证据，生产环境标配“混合检索 + 重排序”，见[检索](./retrieval)
3. **生成**：证据与问题组装成 Prompt，LLM 基于证据作答并标注引用，见[生成](./generation)

## 架构演进

- **Naive RAG**：切块 → 向量检索 → 生成。跑通容易，检索质量是明显短板
- **Advanced RAG**：检索前做[查询优化](./query-optimization)与[路由](./routing-query-construction)，检索中用混合召回，检索后重排序——这是当前生产环境的基线
- **Modular / Agentic RAG**：由 LLM 决定“要不要检索、检索什么、结果够不够”，带自我纠错闭环，见[高级 RAG 架构](./sophisticated-rag)

> 2026 年的共识：先把 Advanced RAG (混合检索 + 重排序) 做扎实，再考虑 Agentic 化。最常见的昂贵错误是检索底座还不可靠就叠加智能体编排。

## 本系列阅读路线

1. 基础管线：[索引构建](./indexing) → [检索](./retrieval) → [生成](./generation)
2. 进阶优化：[查询优化](./query-optimization) → [路由与查询构建](./routing-query-construction) → [索引存储优化](./indexing-optimization) → [高级 RAG 架构](./sophisticated-rag)
3. 检索策略专题：[向量检索](./vector-retrieval)、[布尔检索](./boolean-retrieval)、[知识图谱检索](./knowledge-graph-retrieval)、[规则过滤检索](./rule-based-retrieval)、[多模态 RAG](./multimodal-rag)
4. 质量保障：[评估指标与框架](./evaluation)

::: details e.g. 一个典型的企业级场景
财务问答 Agent：把年报 PDF、制度文档、报表数据库建成索引。用户问“去年研发投入占比变化”，系统检索年报研发章节，LLM 基于原文回答并附上页码引用——数据可信、来源可查，这是纯 LLM 做不到的。本系列后续文章将沿用这个场景作为贯穿示例。
:::

## 参考

- [RAG 原始论文 (Lewis et al., 2020)](https://arxiv.org/abs/2005.11401)
- [Retrieval-Augmented Generation for LLMs: A Survey](https://arxiv.org/abs/2312.10997)
