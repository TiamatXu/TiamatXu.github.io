# 生成 Generation

> **生成**是 RAG 的最后一环：把检索到的证据与用户问题组装成 Prompt，让 LLM 基于证据作答。这一环的核心目标只有一个——**答案的每个事实都要有出处** (Grounding)，检索做得再好，生成环节失守照样产出幻觉。

## Prompt 组装

结构化模板的四要素：角色约束、证据区、问题区、行为规则。

```python
PROMPT = """你是严谨的财务分析助手。仅根据 <context> 中的参考资料回答问题。

规则:
1. 资料中没有的信息,明确回答“参考资料中未找到”,禁止编造
2. 每个关键事实后用 [编号] 标注来源
3. 数字必须与原文完全一致,不要换算或四舍五入

<context>
{context}
</context>

问题:{question}
"""

context = "\n\n".join(
    f"[{i+1}] (来源: {d.metadata['source']}) {d.page_content}"
    for i, d in enumerate(top_docs)
)
```

组装要点：

- **给每条证据编号并附来源元数据**，这是引用标注的前提
- **用分隔符隔离证据与指令** (XML 标签或 Markdown 围栏)，降低文档内容干扰指令的风险
- **证据顺序有讲究**：模型对开头和结尾的内容最敏感 (Lost in the Middle 现象)，把重排序得分最高的放两端
- **明确拒答路径**：“未找到就说未找到”必须写进规则，否则模型会倾向于强行作答

## 调用参数

- `temperature` 取 0~0.3：事实性问答要压制随机性
- 结构化输出场景用 JSON Mode / Structured Outputs，而不是在提示词里恳求模型输出合法 JSON
- 上下文再大也不要无脑塞证据：Top-K 控制在 3~10 条，证据多了反而稀释注意力、推高成本

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.1,
)
```

## 后处理

1. **引用核验**：程序化检查答案中的 [编号] 是否真实存在、关键数字是否能在对应证据中找到原文
2. **安全过滤**：敏感信息 (未公开数据、个人隐私) 在返回前拦截
3. **格式化**：对比类数据转 Markdown 表格，引用编号渲染成可点击的来源链接

## 生成质量的评估维度

| 指标 | 回答的问题 |
|:---|:---|
| Faithfulness (忠实度) | 答案是否只基于检索到的证据,有没有编造 |
| Answer Relevancy (相关性) | 是否直接回答了用户的问题 |
| Groundedness (有据性) | 每个关键陈述能否定位到具体出处 |

自动化评估方法与 RAGAS 框架见[评估指标与框架](./evaluation)；当检索质量本身不可靠时，靠生成端补救是无底洞，应回到[高级 RAG 架构](./sophisticated-rag)引入检索质量评估与纠错闭环。

::: details e.g. 财务报告问答的生成链路
问题“研发投入占比有什么变化？”→ 证据为年报研发章节两个片段 → 生成“研发投入占比从 12.5% 提升至 14.2% [1]”→ 后处理核验：14.2% 在 [1] 原文中存在 ✅，引用编号有效 ✅ → 渲染来源链接后返回。若核验失败，直接降级为“未能从资料中确认”，宁可拒答也不输出未经核实的数字。
:::

## 参考

- [Lost in the Middle 论文](https://arxiv.org/abs/2307.03172)
- [Anthropic: Reducing Hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
