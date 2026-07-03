# 评估与可观测性

> Agent 的执行路径是运行时动态决定的——同一个输入，今天 5 步完成，明天可能 12 步跑偏。**可观测性**回答“它刚才干了什么”，**评估**回答“它干得好不好”。两者是 Agent 从 Demo 走向生产的门票，且都应该在上线前就位，而不是出事后补。

## 可观测性：轨迹追踪

Agent 的最小观测单位不是请求，是**轨迹** (Trace)：一次任务的完整决策链，由若干 Span (单次 LLM 调用、单次工具执行) 组成：

```text
Trace: “帮我订去上海的机票”                    总耗时 38s / $0.42
 ├─ Span 1  LLM 决策:需要查航班        1.2s   输入 2.1k tok
 ├─ Span 2  工具 search_flights        3.4s   返回 18 条
 ├─ Span 3  LLM 决策:筛选并确认       1.8s
 ├─ Span 4  工具 book_flight           2.1s   ⚠️ 参数校验失败
 ├─ Span 5  LLM 自我修正重试           1.6s
 └─ Span 6  工具 book_flight           2.3s   ✅
```

每个 Span 记录输入输出、耗时、token 与错误——排障时直接定位“第几步、为什么拐弯”。主流平台：**LangSmith** (LangChain 系集成最深)、**Braintrust**、**Arize Phoenix** (开源，基于 OpenTelemetry)、**Langfuse** (开源自托管)。选型上，已有 OTel 基建的团队优先选 OTel 兼容方案，避免供应商锁定。

## 评估的三个层次

### 单步评估：工具调用对不对

最容易自动化：该调工具时调了吗？选对工具了吗？参数合法吗？

```python
def eval_tool_choice(case):
    resp = agent.step(case["input"])
    return (resp.tool_name == case["expected_tool"]
            and validate(resp.arguments, case["schema"]))
```

### 轨迹评估：过程合不合理

检查执行路径：有没有死循环、重复调用、忽略工具报错硬编答案。常用“LLM 裁判读轨迹”打分，配合硬规则 (循环次数上限、必经步骤断言)。

### 端到端评估：任务完成没有

最终裁决指标：**任务完成率**。关键设计是**只验证终态，不限定路径**——Agent 用什么路径订到正确的机票都算对，死抠中间步骤会惩罚合理的创造性：

```python
def eval_final_state(case):
    agent.run(case["input"])
    booking = db.query_booking(case["user_id"])   # 检查真实世界的终态
    return booking.destination == "上海" and booking.date == case["date"]
```

公开基准可参考 τ-bench (客服场景、含用户模拟器)、SWE-bench (编码)；但**自有场景的评估集永远比公开基准重要**——方法同 [RAG 评估集构建](/AI/RAG/retrieval-evaluation)：人工核心集 + 合成扩充，失败案例持续回流。

## 线上监控指标

| 维度 | 指标 | 异常信号 |
|:---|:---|:---|
| 质量 | 任务完成率、人工接管率 | 新版本提示词上线后完成率下跌 |
| 成本 | 单任务 token/费用、循环轮次分布 | 平均轮次悄悄从 6 涨到 11 |
| 稳定 | 工具错误率、超时率、重试率 | 某工具错误率突增 (上游 API 变更) |
| 安全 | 越权尝试、护栏触发次数 | 见[安全与护栏](./safety-guardrails) |

## 工程闭环

1. 上线前：评估集过闸 (完成率低于基线阻断发布，同 [RAG 的 CI 实践](/AI/RAG/evaluation))
2. 上线后：全量轨迹追踪 + 指标告警
3. 持续：线上失败轨迹 → 归因 → 沉淀为新评估用例——评估集是活的，不是一次性交付物

::: details e.g. 一次“成本异常”的排查
告警：客服 Agent 单任务平均成本周环比 +40%。查轨迹分布：循环轮次 P50 从 5 涨到 9；抽样发现新接入的订单查询工具返回了整包 JSON (含 200 行无关字段)，模型每轮都在重复解读噪声。修复：工具返回裁剪字段 (见[工具调用](./tool-use))，轮次回落——没有轨迹数据，这类问题只会被归因成“模型变笨了”。
:::

## 参考

- [Anthropic: Demystifying Agent Evals](https://www.anthropic.com/engineering/demystifying-evals)
- [τ-bench 论文](https://arxiv.org/abs/2406.12045)
- [Arize Phoenix](https://github.com/Arize-ai/phoenix)
