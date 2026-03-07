# 索引构建 Indexing

RAG 的“预处理”阶段，把原始文档转化为机器能快速检索的数据格式。大致流程如下：

1. 数据收集：使用对应工具从各种来源 (PDF、数据库、网络等) 收集文本数据。
2. 预处理：清洗文本 (去除噪声、特殊字符、多余空格等)，统一格式、编码。
3. **分块**：根据语义或长度 (分块策略) 切割文档，将长文本分成小片段 (chunk)。
4. **向量化 (Embedding)**：使用嵌入模型将文本转化为向量表示。向量具有维度，语义相似的文本在向量空间中距离较近。
5. 存储：将向量和对应的文本片段存储在索引数据库中 (如 FAISS、Pinecone、Weaviate 等)

提供的能力：快速向量相似度搜索、文档实时检索、用户查询

## 数据收集

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

## 预处理

例如：文档预处理

```python
def preprocess_document(doc):
    """去除多余空格，统一小写等"""
    return re.sub(r'\s+', ' ', doc).strip().lower()
```

## 分块 (Chunking)

目的：将文档切分为小皮段，提高检索效率和相关性，避免一次检索过多无关信息，同时保持语义完整性。

常见分块策略：

1. 固定大小分块 (简单但语义可能不完整)

```python
# 例：按 400 字符分块
chunk_size = 400
chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

# 带重叠的滑动窗口分块，避免信息丢失
chunk_size = 300
overlap = 50  # 重叠50字符
chunks = []
for i in range(0, len(text), chunk_size - overlap):
    chunks.append(text[i:i+chunk_size])
```

2. 基于语义分块 (更复杂但保持语义完整)

```python
# 段落分块（保留逻辑结构）、按换行符或段落标记分割
chunks = text.split('\n\n')

# 按句号、问号、感叹号等结束标记分割
import nltk
sentences = nltk.sent_tokenize(text)
```

参数：

- 块大小 (Chunk Size)：太小 → 语义不完整；太大 → 检索不精确。(建议：200-500 tokens (约 150-400 个汉字))
- 重叠 (Overlap)：避免关键信息被切断。(建议：`chunk_size * [0.1, 0.2]`)

## 向量化 (Embedding)

文本分块后还是人类语言，需要转换为向量，语义相似的文本在向量空间较为接近。核心是使用预训练的嵌入模型 (如 OpenAI 的
text-embedding-3-small)，将文本转化为固定维度的向量表示。

解决的核心问题：传统的关键词匹配无法捕捉语义相似性，而向量化可以通过计算向量之间的距离 (如余弦相似度) 来衡量文本的语义相关性。

常见嵌入模型：不同的模型有不同的维度大小和适用场景，选择时需综合考虑文本类型、语言、计算资源等因素。

| 模型                           | 维度   | 优势      | 适用场景   |
|------------------------------|------|---------|--------|
| OpenAItext-embedding-3-small | 1536 | 效果好，速度快 | 通用场景   |
| OpenAItext-embedding-3-large | 3072 | 效果最好    | 	高精度需求 |
| BGE-large-zh                 | 1024 | 中文友好    | 	中文为主  |
| Sentence-BERT                | 768	 | 开源免费    | 资源有限   |

```python
# 使用OpenAI的Embedding模型
from openai import OpenAI

client = OpenAI()
text = "阿司匹林是一种解热镇痛药"
response = client.embeddings.create(model="text-embedding-3-small", input=text)
vector = response.data[0].embedding
print(f"向量维度: {len(vector)}")  # 输出: 1536
print(f"前5个值: {vector[:5]}")    # 输出: [0.023, -0.014, 0.089, ...]
```

```python
# 余弦相似度计算
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

vec1 = np.array([0.1, 0.3, 0.5])
vec2 = np.array([0.12, 0.29, 0.51])
similarity = cosine_similarity([vec1], [vec2])[0][0]
print(f"相似度: {similarity:.3f}")  # 输出: 0.999（非常相似）
```

## 向量存储

需要使用向量数据库 (Vector Database) 存储，向量数据库使用特别的索引算法 (如HNSW、IVF)，能在百万、千万级向量中毫秒级找到最相似的。

普通数据库 (MySQL、MongoDB) 擅长精确查询，无法进行相似性查询。

**常见的向量数据库有：**

1. Pinecone (云服务，简单好用)
2. Milvus (开源，功能强大)
3. FAISS (Facebook开源，本地使用)
4. Weaviate (支持混合搜索)

## 完整的索引构建流程示例

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
import pinecone

with open("medical_docs.txt", "r") as f:
    document = f.read()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", "。", "！", "？", "，"]
)
chunks = text_splitter.split_text(document)

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

pinecone.init(api_key="your-key")
index_name = "medical-rag"

vectorstore = Pinecone.from_texts(
    texts=chunks,
    embedding=embeddings,
    index_name=index_name
)

print(f"成功索引了 {len(chunks)} 个文本块！")
```
