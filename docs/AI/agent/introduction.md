# 介绍

> **Agent** (智能体) 是以 LLM 为决策核心，能够自主规划、调用工具、观察结果并迭代行动，直至完成目标的系统。与固定流程的工作流不同，Agent 的执行路径由模型在运行时动态决定。

## Workflow vs Agent

| 维度 | 工作流 (Workflow) | 智能体 (Agent) |
|:---|:---|:---|
| 执行路径 | 代码预先编排，固定 | LLM 运行时动态决策 |
| 适用问题 | 步骤明确、可枚举 | 开放式、无法预知步骤 |
| 可预期性 | ✅ 高 | ⚠️ 低，需护栏约束 |
| 成本 | 低且稳定 | 高且波动 (循环次数不定) |

> 业界共识：**能用工作流解决的就不要上 Agent**。Agent 的自主性是用可控性和成本换来的，只有当任务的步骤无法预先确定时才值得。

## 核心组件

一个生产级 Agent 由四部分构成：

1. **模型 (Brain)**：负责推理与决策的 LLM，决定下一步做什么
2. **工具 (Tools)**：与外部世界交互的手段 —— 搜索、读写文件、调 API、执行代码
3. **记忆 (Memory)**：短期的对话上下文 + 长期的持久化知识，跨越单次上下文窗口
4. **编排 (Orchestration)**：驱动“思考 → 行动 → 观察”循环的运行时，含终止条件与护栏

## 基本运行循环

```text
用户目标
   ↓
┌─→ 思考 (Reason)：分析现状，决定下一步
│      ↓
│   行动 (Act)：调用某个工具
│      ↓
│   观察 (Observe)：读取工具返回结果
│      ↓
└── 未完成？继续循环 ──→ 完成？输出最终答案
```

这个循环就是 [ReAct 模式](./react-planning)，是几乎所有 Agent 框架的底层范式。

## 2026 年的 Agent 技术栈

- **协议层**：MCP (Model Context Protocol) 统一工具接入，A2A 协议负责智能体间通信
- **框架层**：LangGraph (图状态编排)、OpenAI Agents SDK、Pydantic AI (类型安全)、CrewAI (多角色协作)
- **上下文层**：上下文工程 (Context Engineering) 取代提示词工程成为核心学科，记忆成为一等公民
- **运维层**：轨迹级可观测性 (LangSmith / Braintrust 等) 与评估基准前置到上线之前

::: details e.g. 一个最小 Agent 的一次任务
目标：“查一下明天北京的天气，如果下雨就在我日历上加一条带伞提醒”。
Agent 先调用天气工具 (行动) → 发现明天有雨 (观察) → 决定需要写日历 (思考) → 调用日历工具创建提醒 (行动) → 确认创建成功 (观察) → 汇报完成。整个路径没有任何一步是提前写死的。
:::

## 本系列文章

1. [ReAct 与规划](./react-planning) —— Agent 的思考方式
2. [工具调用](./tool-use) —— Agent 的双手
3. [MCP 协议](./mcp) —— 工具接入的统一标准
4. [上下文工程](./context-engineering) —— 管理 Agent 的注意力
5. [记忆机制](./memory) —— 跨会话的持久知识
6. [多智能体编排](./multi-agent) —— 从单体到协作
7. [评估与可观测性](./evaluation-observability) —— 从 Demo 到生产的门票
8. [安全与护栏](./safety-guardrails) —— 自主性的边界

## 参考

- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
- [OpenAI: A Practical Guide to Building Agents](https://platform.openai.com/docs/guides/agents)
