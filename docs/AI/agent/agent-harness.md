# Agent Harness

> **Harness** (挽具/脚手架) 是把裸模型变成 Agent 的运行时层——2026 年最重要的架构共识浓缩成一句话：**“如果你不是模型，你就是 Harness”**。同一个模型换不同 Harness，能力表现天差地别；Harness 工程 (Harness Engineering) 因此成为与模型选型同等重要的学科。

## 为什么 Harness 和模型一样重要

模型只会生成 token,Agent 的其余一切都是 Harness 的职责：什么时候调工具、看见什么上下文、犯错后怎么恢复、何时停止。基准测试反复证明：同一模型在不同 Harness 下的任务完成率差距，常常大于相邻两代模型之间的差距——**买最强的模型，配糟糕的 Harness，得到平庸的 Agent**。

## Harness 的四要素

业界对 Harness 的收敛定义是“四个必要且充分的组件”：

| 组件 | 职责 | 对应本站文章 |
|:---|:---|:---|
| **Agent Loop** | 驱动“思考 → 行动 → 观察”循环,决定何时终止 | [ReAct 与规划](./react-planning) |
| **工具接口** | 工具定义、参数校验、结果回传 | [工具调用](./tool-use)、[MCP](./mcp) |
| **上下文管理** | 压缩、外部笔记、JIT 检索 | [上下文工程](./context-engineering) |
| **控制机制** | 权限、审批、沙箱、限额熔断 | [安全与护栏](./safety-guardrails) |

也就是说，本系列前面各篇讲的正是 Harness 的零件；本文讲怎么把它们**组装成一台可靠的机器**。

## Loop 设计：可靠与失控的分界线

2026 年中兴起的 **Loop Engineering** 把注意力从“怎么写提示词”转向“怎么设计驱动 Agent 的循环”。可靠循环的三个特征：

1. **可校验的终止条件**：“测试全绿”是好目标，“把代码改好”不是——成功必须机器可判定，否则循环要么提前退出要么永不收敛
2. **循环组合而非单循环**：对公开 Agent 系统的源码研究显示，13 个头部编码 Agent 中 11 个叠加了多种循环原语——外层规划循环 + 内层执行循环 + 验证重试循环。裸 ReAct 是基础，但单独使用几乎总是不够
3. **失败预算**：每个循环带重试上限与降级路径 (重试 → 换策略 → 上报人工)，没有预算的循环就是烧钱的死循环

```python
# 一个最小但完整的 Harness 循环骨架
def harness_loop(goal: str, max_turns: int = 50):
    ctx = Context(system_prompt, tools)
    for turn in range(max_turns):                 # 限额熔断
        resp = llm(ctx.render())                  # 上下文管理决定模型看见什么
        if resp.tool_calls:
            for call in resp.tool_calls:
                if not policy.allow(call):        # 控制机制:权限拦截
                    ctx.add(f"操作被拒绝: {call.name}")
                    continue
                ctx.add(execute_sandboxed(call))  # 工具接口 + 沙箱
        if verifier.passed(goal):                 # 可校验的终止条件
            return ctx.final_answer()
        ctx.maybe_compact()                       # 接近窗口上限时压缩
    return escalate_to_human(ctx)                 # 失败预算用尽,降级
```

## 环境即 Harness 的延伸

Harness Engineering 的另一半是**塑造 Agent 所处的环境**，而不只是塑造代码：

- **仓库内指令文件** (CLAUDE.md / AGENTS.md)：把项目约定、构建命令、禁区写在 Agent 必读的位置
- **快速反馈回路**：lint、测试、类型检查越快越好——Agent 的自我纠错完全依赖环境反馈的质量与速度
- **可恢复性**：git 分支、检查点、可回滚的操作，让 Agent 敢于尝试、错了能撤

> 这解释了一个反直觉现象：对固定模型，花一天优化环境反馈 (更快的测试、更明确的指令文件)，收益常高于花一天调提示词。

## 主流 Harness 剖析

| Harness | 形态 | 架构特点 |
|:---|:---|:---|
| Claude Code | 终端 CLI | 单主循环 + 子 Agent 派发,文件式记忆,权限分级审批 |
| OpenAI Codex CLI | 终端 CLI | 沙箱优先,默认最小权限 |
| OpenHands | 平台 | 事件流架构,浏览器 + 终端双环境 |
| Microsoft Agent Framework | SDK | Harness 作为一等抽象,内建 CodeAct 支持 |

选型逻辑与其说“哪个 Harness 好”，不如说“哪个 Harness 的四要素配比匹配你的场景”：高危环境重控制机制，长任务重上下文管理，工具密集重工具接口生态 ([MCP](./mcp) 兼容度)。

## 工程演进的四级台阶

```text
Prompt Engineering  → 优化单次指令怎么说
Context Engineering → 管理模型每一步看见什么
Harness Engineering → 设计模型外的整个运行时
Loop Engineering    → 设计“驱动 Agent 的循环”本身,人退出单轮交互
```

每一级都不取代上一级，而是把上一级变成自己的子问题。2026 年的前沿实践已经走到第四级：人不再逐轮提示 Agent，而是设计好循环、验证器与预算，让 Harness 自己跑。

::: details e.g. 同一模型、两种 Harness 的差距
任务：修复一个带测试套件的后端 bug。Harness A (裸 ReAct + 无验证)：模型改完代码就宣布完成，实际测试未过。Harness B (计划循环 + “测试全绿”终止条件 + 失败重试预算 3 次)：第一次修复未过，Harness 把失败测试的输出喂回，第二轮定位到边界条件，测试全绿后才允许退出。同一个模型，完成率从“碰运气”变成“稳定收敛”——差距全部来自 Harness。
:::

## 参考

- [Awesome Harness Engineering](https://github.com/ai-boost/awesome-harness-engineering)
- [Inside the Scaffold: A Source-Code Taxonomy of Coding Agent Architectures](https://arxiv.org/pdf/2604.03515)
- [Loop Engineering 指南](https://tosea.ai/blog/loop-engineering-ai-agents-complete-guide-2026)
