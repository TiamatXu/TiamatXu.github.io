# 工具调用

> **工具调用** (Tool Use / Function Calling) 让 LLM 以结构化方式请求执行外部函数——模型输出“调用哪个工具 + 什么参数”的 JSON，运行时执行后把结果喂回模型。这是 Agent 与外部世界交互的唯一通道。

## 工作原理

关键认知：**模型从不真正执行任何代码**，它只是生成调用意图，执行永远发生在你的运行时里。

```text
1. 开发者随请求提交工具定义 (名称 + 描述 + JSON Schema 参数)
2. 模型判断需要外部信息 → 返回 tool_call: {name, arguments}
3. 运行时校验参数 → 执行真实函数 → 把结果作为 tool 消息回传
4. 模型基于结果继续推理，或发起下一次调用
```

```python
tools = [{
    "name": "get_weather",
    "description": "查询指定城市的当前天气。城市名用中文，如「北京」。",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {"type": "string", "description": "城市名"},
        },
        "required": ["city"],
    },
}]
```

## 工具设计原则

工具的质量直接决定 Agent 的上限，常见共识：

- **描述写给模型看**：description 是模型选择工具的唯一依据，要写清“什么时候用、什么时候不用、参数格式示例”
- **单一职责**：一个工具做一件事；`search_and_summarize` 这种复合工具会剥夺模型的中间决策权
- **返回信息适量**：返回太少模型瞎猜，返回全量 JSON 淹没上下文——只返回决策需要的字段
- **错误也是信息**：工具失败时返回结构化错误说明 (“城市名不存在，支持的格式是…”)，让模型能自我纠正而不是重复撞墙
- **幂等与确认**：查询类工具可放开重试；写操作 (转账、删除) 必须加人工确认或权限门槛

## 并行与多轮调用

- **并行调用**：无依赖的多个调用一次返回 (同时查三个城市天气)，显著降低延迟
- **多轮串行**：后一个调用依赖前一个结果时，自然形成 [ReAct 循环](./react-planning)
- **强制调用**：`tool_choice` 参数可强制模型必须调用某工具，用于路由等确定性场景

## 常见坑

| 问题 | 对策 |
|:---|:---|
| 模型幻觉出不存在的参数 | 运行时用 JSON Schema 严格校验，拒绝并回传错误 |
| 工具太多导致选择混乱 | 超过 20~30 个工具时做分组/动态加载,只暴露当前相关的 |
| 模型明明该调工具却直接回答 | 描述里写明「涉及 X 时必须调用本工具」 |
| 敏感操作被误触发 | 写操作默认要求确认,或在运行时层做权限拦截 |

::: details e.g. 客服退款 Agent 的工具边界
`query_order` (查订单) 可以让模型自由调用；`refund` (退款) 则在运行时强制两道闸门：金额超过阈值转人工、任何调用先向用户复述金额并确认。护栏放在运行时而非提示词里——提示词只是建议，运行时拦截才是保证。
:::

## 参考

- [Anthropic Tool Use 文档](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview)
- [Anthropic: Writing Effective Tools for AI Agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
