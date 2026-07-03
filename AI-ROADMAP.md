# AI 专栏建设路线图

> 本文件是「RAG + Agent 前沿教程」定时任务的跨运行状态文件。
> 每次运行:先读本文件 → 完成「待写/需增补」条目 → 同步更新状态。
> 状态取值:`待写` / `需增补` / `已完成`。

## RAG 系列 (docs/AI/RAG/)

| 文件 | 标题 | 摘要 | 状态 |
|---|---|---|---|
| introduction.md | 介绍 | RAG 概念、流程、架构演进与阅读路线 | 已完成 (2026-07-03 重写) |
| indexing.md | 索引构建 | 清洗、分块策略、Embedding 选型、向量库 | 已完成 (2026-07-03 重写) |
| retrieval.md | 检索 | 混合召回 (Dense + BM25 + RRF) 与 Cross-Encoder 重排序 | 已完成 (2026-07-03 重写) |
| generation.md | 生成 | Prompt 组装、Grounding、引用核验 | 已完成 (2026-07-03 重写) |
| query-optimization.md | 查询优化 | Multi Query、RAG-Fusion、分解、Step Back、HyDE | 已完成 (2026-07-03 重写) |
| routing-query-construction.md | 路由与查询构建 | 逻辑/语义路由、Text-to-SQL、Self-Query | 已完成 (2026-07-03 重写) |
| indexing-optimization.md | 索引存储优化 | 父子块、多表示、上下文增强、RAPTOR、ColBERT | 已完成 (2026-07-03 重写) |
| sophisticated-rag.md | 高级 RAG 架构 | CRAG、Self-RAG、Agentic RAG、Adaptive RAG | 已完成 (2026-07-03 重写) |
| evaluation.md | 评估指标与框架 | 检索/生成指标、RAGAS、评估集与 CI | 已完成 (2026-07-03 重写) |
| vector-retrieval.md | 基于向量的语义检索 | Embedding、ANN 索引、相似度度量 | 已完成 (2026-07-03) |
| boolean-retrieval.md | 基于关键词的布尔检索 | 倒排索引、BM25、稀疏检索 | 已完成 (2026-07-03) |
| knowledge-graph-retrieval.md | 基于知识图谱的关系检索 | 实体关系抽取、GraphRAG、多跳推理 | 已完成 (2026-07-03) |
| rule-based-retrieval.md | 基于规则的过滤检索 | 元数据过滤、权限控制、混合过滤 | 已完成 (2026-07-03) |
| multimodal-rag.md | 多模态 RAG | 转文本/多模态 Embedding/ColPali 三路线 | 已完成 (2026-07-03) |
| document-parsing.md | 多格式文档解析 | PDF/Word/HTML/Excel 逐格式处理方案与代码 | 已完成 (2026-07-03) |
| chunking-in-practice.md | 分块实战 | 四种分块策略实现、表格处理、父子块落地 | 已完成 (2026-07-03) |
| retrieval-in-practice.md | 检索实战 | 混合召回 + RRF + 重排序端到端可运行管线 | 已完成 (2026-07-03) |
| retrieval-evaluation.md | 检索效果评估实战 | 评估集构建、指标实现、消融实验、错误分析 | 已完成 (2026-07-03) |

## Agent 系列 (docs/AI/agent/)

| 文件 | 标题 | 摘要 | 状态 |
|---|---|---|---|
| introduction.md | 介绍 | Agent 定义、核心组件、与工作流的区别 | 已完成 (2026-07-03) |
| react-planning.md | ReAct 与规划 | ReAct 循环、任务分解、Plan-and-Execute | 已完成 (2026-07-03) |
| tool-use.md | 工具调用 | Function Calling 原理、工具设计原则 | 已完成 (2026-07-03) |
| mcp.md | MCP 协议 | Model Context Protocol 架构与生态 | 已完成 (2026-07-03) |
| context-engineering.md | 上下文工程 | 注意力预算、压缩、JIT 上下文、外部笔记、子 Agent 隔离 | 已完成 (2026-07-03) |
| memory.md | 记忆机制 | 三层记忆模型、写入/读取策略、文件式/Mem0/Zep 路线 | 已完成 (2026-07-03) |
| multi-agent.md | 多智能体编排 | Orchestrator-Worker、Handoff、A2A、共享状态取舍 | 已完成 (2026-07-03) |
| evaluation-observability.md | 评估与可观测性 | 轨迹追踪、三层评估、线上监控指标 | 已完成 (2026-07-03) |
| safety-guardrails.md | 安全与护栏 | 致命三要素、注入防御、权限分级、沙箱限额 | 已完成 (2026-07-03) |

## 热点专题 (docs/AI/trends/)

| 文件 | 标题 | 摘要 | 状态 |
|---|---|---|---|
| hot-ai-projects.md | 半年 AI 热点项目与概念 | 以运行当天为准回溯 6 个月的热门项目/概念盘点 | 待写 (前置条件:RAG 与 Agent 系列全部完成) |

## 运行日志

- 2026-07-03 首次全量:调研完成;补写 4 篇检索策略文章;新建 Agent 系列前 4 篇;更新 sidebar.yaml (/AI/agent/ 分组)。
- 2026-07-03 RAG 全面重构:重写 9 篇旧文 (统一结构、修正过时 API、补 2026 实践);新增 multimodal-rag.md;RAG 系列 14 篇全部完成。
- 2026-07-03 新增「工程实战」深潜 4 篇:文档解析、分块实战、检索实战、检索评估实战,均含可运行示例代码;sidebar 新增工程实战分组;RAG 系列扩至 18 篇。
- 2026-07-03 Agent 系列完成剩余 5 篇:上下文工程、记忆机制、多智能体编排、评估与可观测性、安全与护栏。RAG + Agent 全部完成,下一轮进入热点专题。
