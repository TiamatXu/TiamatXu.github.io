# 多智能体编排

> **多智能体系统** (Multi-Agent System) 用多个各司其职的 Agent 协作完成单个 Agent 难以胜任的任务。但先泼冷水：多智能体的首要收益不是“集体智慧”，而是**上下文隔离与并行**——加 Agent 等于加复杂度，单 Agent 能做好的事不要拆。

## 什么时候才需要多智能体

| 信号 | 原因 |
|:---|:---|
| 单 Agent 上下文被子任务噪声塞爆 | 隔离:子 Agent 各烧各的上下文,只回传结论 |
| 子任务天然可并行 (多路调研、多文件分析) | 并行:总耗时从串行和变成最大值 |
| 职责差异大,一套提示词/工具集顾不过来 | 专业化:每个 Agent 更小、更准、更可测 |
| 需要不同权限边界 (只读调研 vs 可写执行) | 安全:权限跟着角色走,见[安全与护栏](./safety-guardrails) |

反例：步骤间强串行依赖、每步都要共享全部状态的任务——拆了只会引入通信损耗，不如单 Agent + [好的上下文管理](./context-engineering)。

## 主流编排模式

### Orchestrator-Worker (主从式，生产主流)

一个编排者负责分解任务、派发子任务、汇总结果；Worker 各自在独立上下文里执行：

```text
用户目标 → Orchestrator (规划/分派/汇总)
              ├─ Worker A:调研竞品定价     (并行)
              ├─ Worker B:分析用户数据     (并行)
              └─ Worker C:起草报告         (依赖 A、B 结果)
```

关键设计：**任务简报要完整**。Worker 拿不到主上下文，派发时必须写清目标、边界、期望输出格式——简报写得含糊，Worker 就会各自发挥，汇总时全对不上。

### Handoff (交接式)

Agent 之间移交控制权 (客服 Agent → 退款 Agent → 人工)，同一时刻只有一个 Agent 在工作。OpenAI Agents SDK 的核心原语，适合流程有明确阶段边界的场景。

### 辩论/评审式

多个 Agent 独立作答后互相批评、投票或由裁判合并。用算力换质量，适合高价值决策 (架构评审、风险评估)，日常任务成本难以合理化。

## 通信与状态：两派取舍

- **共享状态** (LangGraph 谱系)：所有 Agent 读写同一个全局 State，协调简单，但耦合随规模上升——Thoughtworks 技术雷达已提醒“把一切多智能体系统建模为全局共享状态图”并非普适解
- **消息传递** (A2A 协议方向)：Agent 间只靠结构化消息交互，边界清晰、可跨框架跨组织，代价是通信协议本身要设计。Google 主导的 **A2A** (Agent2Agent) 正在成为跨系统互操作标准，与 [MCP](./mcp) 互补：MCP 管“Agent ↔ 工具”，A2A 管“Agent ↔ Agent”

单团队内部系统从共享状态起步足够；跨团队、跨信任边界的协作，消息传递是必然选择。

## 多智能体的代价

- **成本倍增**：Anthropic 实测多智能体研究系统的 token 消耗约为单次对话的 15 倍，收益必须撑得起这个成本
- **错误级联**：Worker 的一个幻觉结论会被 Orchestrator 当事实汇总，关键结论要求 Worker 附带证据来源
- **调试地狱**：并行轨迹交织，没有[轨迹级可观测性](./evaluation-observability)基本无法排障——先上追踪，再上多智能体

::: details e.g. 一次深度调研任务的编排
“调研三家竞品的定价策略并出对比报告”。Orchestrator 拆出 3 个并行调研 Worker (每家竞品一个，各自搜索几十个网页、烧 5 万 token) + 1 个报告 Worker。主上下文只收到 3 份千字结论和最终报告——若单 Agent 串行做，上下文早在第二家竞品时就塞满了搜索残渣。
:::

## 参考

- [Anthropic: How We Built Our Multi-Agent Research System](https://www.anthropic.com/engineering/built-multi-agent-research-system)
- [A2A 协议](https://github.com/a2aproject/A2A)
- [LangGraph Multi-Agent 文档](https://langchain-ai.github.io/langgraph/concepts/multi_agent/)
