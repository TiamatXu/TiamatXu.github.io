---
outline: deep
---

# RAG 入门

> **RAG** (Retrieval-Augmented Generation，检索增强生成) 是一种结合了检索和生成的自然语言处理技术，旨在提高生成文本的**质量**和**相关性**。

## 一、RAG 全览

**RAG 流程**

- 数据来源：PDF 文档、数据库、网络博客、维基百科、邮件、聊天记录等
- 索引构建：清洗 → 分块 → 向量化 → 索引存储
- 资源检索：问题请求 → 向量化 → 索引查询 (相似度) → 相关文档返回
- 结果生成：构建 Prompt → LLM 生成 → 后处理 → 返回结果

**解决的问题**

- 知识时效性：弥补 LLM 训练截止导致的信息滞后，通过检索最新来源提供实时事实依据。
- 领域适应性：结合领域文档/知识库，提升在特定行业或专业问题上的表现。
- 准确性与可验证性：以检索到的证据为依据，减少幻觉并便于来源追溯与验证。

**优势**

- 知识更新：重新训练 (成本高) → 更新知识库 (成本低)
- 事实准确性：幻觉 → 基于检索到的真实文档
- 领域适配：微调模型 → 添加领域文档
- 可追溯性：无法追溯来源 → 标注来源和引用
- 成本：训练和部署成本高 → 相对经济

### 1.1 Indexing 索引构建

RAG 的“预处理”阶段，把原始文档转化为机器能快速检索的数据格式。其大致流程如下：

1. 数据收集：使用对应工具从各种来源 (PDF、数据库、网络等) 收集文本数据。
2. 预处理：清洗文本 (去除噪声、特殊字符、多余空格等)，统一格式、编码。
3. **分块**：根据语义或长度 (分块策略) 切割文档，将长文本分成小片段 (chunk)。
4. **向量化 (Embedding)**：使用嵌入模型将文本转化为向量表示。向量具有维度，语义相似的文本在向量空间中距离较近。
5. 存储：将向量和对应的文本片段存储在索引数据库中 (如 FAISS、Pinecone、Weaviate 等)

提供的能力：快速向量相似度搜索、文档实时检索、用户查询

#### 数据收集

| 来源类型 | 渠道 etc.               | 工具 etc.                |
|------|-----------------------|------------------------|
| 文档   | TXT Word Markdown PDF | pyPDF2 python-docx     |
| 网络   | 网页、文库、百科              | requests BeautifulSoup |
| 数据库  | 关系型、非关系型              | database drivers       |
| 实时信息 | 邮件、聊天记录               | 协议                     |
| 表格   | Excel、Csv             | Pandas                 |

::: details e.g. 财务报告智能生成系统 | 财务知识问答 Agent
  - 财务报告模板 (PDF)
  - 财务知识库 (数据库)
  - 财务法规政策 (Word 文档)
  - 财务分析案例 (网页)
  - 财务数据表格 (Excel)
:::

#### 文档预处理

例如：文档预处理
```python
def preprocess_document(doc):
    """去除多余空格，统一小写等"""
    return re.sub(r'\s+', ' ', doc).strip().lower()
```

::: code-group

```sh [npm]
$ npm create vue@latest
```

```sh [pnpm]
$ pnpm create vue@latest
```

```sh [yarn]
# For Yarn (v1+)
$ yarn create vue

# For Yarn Modern (v2+)
$ yarn create vue@latest
  
# For Yarn ^v4.11
$ yarn dlx create-vue@latest
```

```sh [bun]
$ bun create vue@latest
```
:::




















