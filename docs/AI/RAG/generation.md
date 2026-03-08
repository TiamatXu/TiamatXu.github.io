# 生成 Generation

在检索到相关的知识片段后，最后一步是将这些片段与用户的问题组合在一起，交给 LLM 生成最终的答案。

## 提示词构建 (Prompt Engineering)

核心是将“检索到的文档”和“用户问题”组合成一个结构化的指令。

### 基础模板

```python
prompt_template = """
你是一个专业的财务分析师。请基于以下参考资料回答用户的问题。
如果参考资料中没有相关信息，请明确告知用户，不要编造。

参考资料：
{context}

用户问题：
{question}

请提供详细、准确的回答，并标注信息来源。
"""

# 填充内容
context = "

".join([doc.page_content for doc in retrieved_docs])
prompt = prompt_template.format(context=context, question=question)
```

### 进阶模板 (结构化输出)

```python
advanced_prompt = """
参考资料：
{context}

用户问题：{question}

请按以下财务分析格式回答：
1. 核心数据摘要：用一句话概括关键指标。
2. 详细分析：结合资料展开说明，分点列出。
3. 风险提示/注意事项：相关的财务合规或市场风险。
4. 信息来源：标注参考了哪些财报章节。
"""
```

## 调用 LLM 生成

通常使用较低的 `temperature` (如 0.1 - 0.3) 以降低随机性，确保财务数据的准确性。

```python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个严谨的财务助手"},
        {"role": "user", "content": prompt}
    ],
    temperature=0.1
)
answer = response.choices[0].message.content
```

## 答案后处理

生成后的内容可能需要进一步处理：
1. **引用标注**：为答案中的关键事实添加脚注，链接到原始财报 PDF 的对应页码。
2. **安全过滤**：检查答案是否包含敏感未公开数据或违反合规要求的建议。
3. **格式美化**：将对比数据转化为 Markdown 表格。

## 生成效果评估指标

为了确保财务 Agent 不“胡说八道”，我们需要从多个维度评估：`

| 指标                     | 评估内容            | 评估方法           |
|:-----------------------|:----------------|:---------------|
| **Faithfulness (忠实度)** | 答案是否完全源于检索到的文档  | LLM 判别 / 人工核对  |
| **Relevance (相关性)**    | 答案是否直接回答了用户的问题  | LLM 评分 / 向量相似度 |
| **Coherence (连贯性)**    | 答案是否流畅、逻辑连贯     | 语言模型困惑度评估      |
| **Groundedness (有据性)** | 每一句关键陈述是否都有文档支持 | 检查是否有引用标注      |

::: details e.g. 财务报告生成案例
- **检索内容**：2023年年度报告 - 研发投入章节。
- **用户问题**：“公司的研发投入占比有什么变化？”
- **生成答案**：“根据2023年年报，研发投入占比从去年的 12.5% 提升至 14.2%(引用 [1])。主要投入方向为国产芯片研发。”
- **评估**：系统会自动核对 14.2% 是否在原文中出现，以确保数据真实。
:::
