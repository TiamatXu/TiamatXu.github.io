# Agent Skills

> **Agent Skills** 是把“过程性知识”打包给 Agent 的标准形态：一个含元数据的 Markdown 文件 (SKILL.md) + 可选的脚本与参考资料。它解决的是 [MCP](./mcp) 不管的另一半问题——**MCP 标准化了“连接工具”，Skills 标准化了“学会流程”**。2025 年底由 Anthropic 提出，半年内成为跨 16+ 工具的通用格式。

## 动机：提示词的“复用性危机”

没有 Skills 之前，团队的过程知识散落在三个糟糕的地方：反复粘贴的提示词片段、越长越臃肿的 System Prompt、只在某个人脑子里的操作步骤。Skills 把这些知识变成**版本化、可分发、按需加载**的文件——写一次，全团队的 Agent 都会。

## 核心机制：渐进式披露 (Progressive Disclosure)

Skills 的关键设计是三级懒加载，这直接师承[上下文工程](./context-engineering)的 JIT 原则：

```text
第 1 级  元数据 (name + description)   → 启动时全部加载,每个仅几十 token
第 2 级  SKILL.md 正文                 → 模型判断任务匹配时才加载
第 3 级  脚本、模板、参考文件           → 执行到需要时才读取
```

装 100 个 Skills，空闲时只占几千 token 的“目录”；真正展开的永远只有当前用到的那一个。对比把所有流程写进 System Prompt 的做法，上下文成本从 O (全部) 降到 O (所需)。

## SKILL.md 的结构

```markdown
---
name: release-checklist
description: 发布新版本时使用。执行发版检查清单:跑测试、
  更新 changelog、打 tag、通知渠道。用户提到“发版/发布”时触发。
---

# 发版流程

1. 运行 `pnpm test`,全绿才继续;失败则停止并报告
2. 依据 git log 生成 changelog,追加到 CHANGELOG.md
3. 按语义化版本打 tag (参考 scripts/version.sh)
4. 用 notify.py 发布通知到指定渠道

## 边界
- 永远不要直接 push 到 main
- 版本号冲突时停下来问用户
```

写作要点：

- **description 决定命中率**：它是模型“要不要用这个 Skill”的唯一依据，要写清触发场景与关键词——这和[工具描述](./tool-use)的设计原则完全同构
- **正文写流程与边界**，不写背景科普；Agent 需要的是可执行步骤，不是教程
- **脚本优于描述**：能用确定性脚本完成的步骤 (版本号计算、格式转换) 就附脚本，把 LLM 的自由发挥限制在需要判断的环节

## Skills、MCP、子 Agent 的分工

三者经常被混为一谈，实际是互补的三层：

| 机制 | 回答的问题 | 类比 |
|:---|:---|:---|
| [MCP](./mcp) | 我能连接什么工具/数据? | 给员工配的软件与账号 |
| **Skills** | 这类任务的正确流程是什么? | 公司的 SOP 手册 |
| [子 Agent](./multi-agent) | 谁去执行这个子任务? | 派给哪个同事 |

三者可组合：一个 Skill 的流程里可以调用 MCP 工具、也可以派发子 Agent——“SOP 里写着用什么软件、哪步外包给谁”。

## 安全：Skill 即代码

第三方 Skill 的信任问题与 MCP Server 同级甚至更高——SKILL.md 是直接注入上下文的指令，附带脚本更是直接执行的代码：

- 安装前审查：像审查依赖一样读一遍 SKILL.md 与附带脚本
- 来源白名单：只从可信仓库安装，警惕“Skill 市场”里的投毒 (指令夹带外传数据的步骤)
- 运行时兜底：Skill 触发的高危操作依然要过[权限拦截](./safety-guardrails)，SOP 不能绕过门禁

## 与相邻方案对比

| 方案 | 加载成本 | 可分发 | 适用 |
|:---|:---|:---|:---|
| 写进 System Prompt | 常驻,全量 | 差 (复制粘贴) | 极高频、极短的规则 |
| RAG 检索文档 | 按需 | 好 | 事实性知识 (是什么) |
| **Skills** | 按需,三级懒加载 | 好 (文件即包) | 过程性知识 (怎么做) |
| 微调 | 训练成本 | 差 | 风格与领域语感 |

::: details e.g. 一个团队的 Skills 化改造
数据团队把“月度报表生成”流程做成 Skill:description 写“用户要求生成/更新月报时使用”，正文 7 步流程，附 SQL 模板与图表脚本。此前每次靠资深同事口述给 Agent 提示，月报质量随提示人水平波动；Skills 化后，任何人对 Agent 说“出上个月的报表”，走的都是同一套经过评审的流程——过程知识第一次像代码一样被版本管理。
:::

## 参考

- [Anthropic: Agent Skills](https://www.anthropic.com/news/skills)
- [Agent Skills 综述论文](https://arxiv.org/html/2605.07358v1)
- [Agent Skills 生态报告 2026](https://agentman.ai/blog/agent-skills-ecosystem-report-2026)
