# AI 专栏建设路线图

> 本文件是「RAG + Agent 前沿教程」定时任务的跨运行状态文件。
> 每次运行:先读本文件 → 完成「待写/需增补」条目 → 同步更新状态。
> 状态取值:`待写` / `需增补` / `已完成`。

## RAG 系列 (docs/AI/RAG/)

| 文件 | 标题 | 摘要 | 状态 |
|---|---|---|---|
| introduction.md | 介绍 | RAG 概念、流程与价值 | 已完成 |
| indexing.md | 索引构建 | 清洗、分块、向量化、存储 | 已完成 |
| retrieval.md | 检索 | 检索基础流程 | 需增补:补混合检索 (Dense + BM25) 与 Cross-Encoder 重排序,2026 生产基线 |
| generation.md | 生成 | Prompt 构建与后处理 | 已完成 |
| query-optimization.md | 查询优化 | 查询改写、扩展、分解 | 已完成 |
| routing-query-construction.md | 路由与查询构建 | 逻辑/语义路由、结构化查询 | 已完成 |
| indexing-optimization.md | 索引存储优化 | 分块与索引策略优化 | 已完成 |
| sophisticated-rag.md | 高级 RAG 架构 | CRAG、Self-RAG | 需增补:补 Agentic RAG 与 Adaptive RAG (查询分类路由) |
| evaluation.md | 评估指标与框架 | RAG 评估 | 需增补:补 RAGAS 等框架与主流基准 |
| vector-retrieval.md | 基于向量的语义检索 | Embedding、ANN 索引、相似度度量 | 已完成 (2026-07-03) |
| boolean-retrieval.md | 基于关键词的布尔检索 | 倒排索引、BM25、稀疏检索 | 已完成 (2026-07-03) |
| knowledge-graph-retrieval.md | 基于知识图谱的关系检索 | 实体关系抽取、GraphRAG、多跳推理 | 已完成 (2026-07-03) |
| rule-based-retrieval.md | 基于规则的过滤检索 | 元数据过滤、权限控制、混合过滤 | 已完成 (2026-07-03) |
| multimodal-rag.md | 多模态 RAG | 图表/图像检索、多模态 Embedding | 待写 |

## Agent 系列 (docs/AI/agent/)

| 文件 | 标题 | 摘要 | 状态 |
|---|---|---|---|
| introduction.md | 介绍 | Agent 定义、核心组件、与工作流的区别 | 已完成 (2026-07-03) |
| react-planning.md | ReAct 与规划 | ReAct 循环、任务分解、Plan-and-Execute | 已完成 (2026-07-03) |
| tool-use.md | 工具调用 | Function Calling 原理、工具设计原则 | 已完成 (2026-07-03) |
| mcp.md | MCP 协议 | Model Context Protocol 架构与生态 | 已完成 (2026-07-03) |
| context-engineering.md | 上下文工程 | 上下文窗口管理、压缩、检索式上下文 | 待写 |
| memory.md | 记忆机制 | 分层记忆 (核心/归档/召回)、Mem0/Letta 等框架 | 待写 |
| multi-agent.md | 多智能体编排 | Orchestrator-Worker、A2A、共享状态取舍 | 待写 |
| evaluation-observability.md | 评估与可观测性 | 轨迹追踪、评估基准、LangSmith 等平台 | 待写 |
| safety-guardrails.md | 安全与护栏 | 权限边界、注入防御、人工审批点 | 待写 |

## 热点专题 (docs/AI/trends/)

| 文件 | 标题 | 摘要 | 状态 |
|---|---|---|---|
| hot-ai-projects.md | 半年 AI 热点项目与概念 | 以运行当天为准回溯 6 个月的热门项目/概念盘点 | 待写 (前置条件:RAG 与 Agent 系列全部完成) |

## 运行日志

- 2026-07-03 首次全量:调研完成;补写 4 篇检索策略文章;新建 Agent 系列前 4 篇;更新 sidebar.yaml (/AI/agent/ 分组)。
