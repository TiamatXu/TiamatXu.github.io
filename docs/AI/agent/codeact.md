# CodeAct：代码执行范式

> 传统[工具调用](./tool-use)是“每轮选一个工具、等结果、再选下一个”；**CodeAct** (Code as Action) 让模型直接**写一段代码**，在沙箱里一次执行完整个操作序列。2026 年上半年，这个范式从论文走进主流框架 (Anthropic 的 MCP 代码执行、Microsoft Agent Framework、smolagents)，成为工具密集型任务的默认优化手段。

## 动机：逐轮工具调用的三笔浪费

设想任务“把 CRM 里 50 个客户的邮箱同步到邮件系统”：

1. **轮次浪费**：传统模式要 100+ 次工具调用，每次一个来回，延迟按轮数累加
2. **上下文浪费**：50 个客户的完整 JSON 全部流经上下文——模型其实只需要“同步成功了几个”
3. **能力浪费**：循环、过滤、聚合这些确定性逻辑，让 LLM 逐轮“心算”既慢又容易错，而这正是代码最擅长的

CodeAct 的答案：让模型写一个 for 循环。

## 核心机制

模型的输出不再是 `tool_call` JSON，而是一段调用工具 API 的代码，在沙箱中执行后只回传最终结果：

```python
# 模型生成的“行动”本身就是这段代码,在沙箱内执行
customers = call_tool("crm.list_customers", {"status": "active"})

synced, failed = 0, []
for c in customers:                       # 确定性循环,不消耗 LLM 轮次
    if not c.get("email"):
        continue
    r = call_tool("mail.upsert_contact", {"email": c["email"], "name": c["name"]})
    synced += 1 if r["ok"] else failed.append(c["id"]) or 0

print(f"同步 {synced} 个,失败 {len(failed)} 个: {failed[:5]}")
# 只有这一行 print 进入模型上下文——50 个客户的 JSON 全程留在沙箱里
```

三个立竿见影的收益：

- **轮次坍缩**：100 轮 → 1 轮，延迟与 token 成本大幅下降 (Anthropic 报告典型场景 token 降幅可达 98%)
- **中间结果不进上下文**：大数据在沙箱变量里流转，模型只看摘要——这是[上下文工程](./context-engineering)“工具结果瘦身”的极致形态
- **确定性逻辑归代码**：过滤、重试、聚合交给解释器，LLM 只负责“写对程序”这一次判断

## 与 MCP 的结合

MCP 工具数量膨胀后，把所有工具定义塞进上下文本身就是负担。代码执行模式下，工具被呈现为**代码 API** (如文件树形式的模块)，模型按需 import——工具定义也变成了[渐进式披露](./agent-skills)：

```text
tools/
├── crm/list_customers.py      # 模型需要时才读取签名
├── mail/upsert_contact.py
└── ...
```

## 与传统工具调用的对比与选型

| 维度 | 逐轮 Tool Use | CodeAct |
|:---|:---|:---|
| 简单任务 (1~3 次调用) | ✅ 直接、可控 | ⚠️ 杀鸡用牛刀 |
| 批量/管道任务 | ❌ 轮次爆炸 | ✅ 一段代码搞定 |
| 中间数据量大 | ❌ 全部过上下文 | ✅ 留在沙箱 |
| 每步需人工审批 | ✅ 天然逐步 | ⚠️ 代码整体审批,粒度粗 |
| 安全面 | 参数校验即可 | ❌ 需要完整代码沙箱 |

选型经验：**交互式、高危、步骤少 → 逐轮调用；批量、数据重、逻辑确定 → CodeAct**。两者不互斥——成熟 Harness 把 CodeAct 作为一个特殊工具 (`execute_code`) 挂在逐轮循环里，模型自己决定何时“降级为写代码”。

## 安全：沙箱是硬前提

CodeAct 把“执行模型生成的代码”变成常态，[安全与护栏](./safety-guardrails)的要求随之升级：

- **强隔离沙箱**：容器/microVM，文件系统只读挂载 + 白名单写目录，网络默认断开、按需放行
- **能力注入而非环凭据**：沙箱内只暴露 `call_tool` 网关，不放真实 API Key——工具调用依然逐个过权限策略，代码只是编排层
- **资源限额**：CPU/内存/执行时长硬上限，防失控循环
- **代码审计日志**：每段执行过的代码入档，出事可回溯

::: details e.g. 数据分析 Agent 的范式切换
任务“分析上季度 12 万行订单，给出各区域退货率 Top5”。逐轮模式：模型反复调分页查询，上下文被订单 JSON 塞爆，数了三轮就开始算错。CodeAct 模式：模型写 30 行 pandas，沙箱内完成聚合，上下文只进来一张 5 行的结果表。任务从“不可行”变成“12 秒完成”——不是模型变强了，是终于没让它干解释器的活。
:::

## 参考

- [CodeAct 论文 (Executable Code Actions)](https://arxiv.org/abs/2402.01030)
- [Anthropic: Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)
- [Code as Agent Harness](https://arxiv.org/html/2605.18747v1)
