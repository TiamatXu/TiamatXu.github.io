# 基于关键词的布尔检索

> **关键词检索** (Keyword / Sparse Retrieval) 基于词项的精确匹配，通过倒排索引与统计打分 (如 BM25) 返回结果，是搜索引擎数十年验证过的经典方案，在 RAG 中与向量检索互补。

## 核心原理

### 倒排索引

正排索引是“文档 → 词列表”，倒排索引反过来记录“词 → 文档列表”：

```text
"向量"   → [doc1, doc3, doc7]
"索引"   → [doc1, doc2]
"BM25"  → [doc2]
```

查询时对词项做布尔运算 (AND / OR / NOT) 即可快速取交并集，无需扫描全部文档。

### BM25 打分

布尔匹配只回答“命中与否”，BM25 进一步回答“命中得多好”，核心由三部分组成：

- **词频 (TF)**：词在文档中出现越多越相关，但存在饱和上限 (参数 k1 控制)
- **逆文档频率 (IDF)**：越稀有的词区分度越高，“的”“是”几乎不贡献分数
- **文档长度归一化**：避免长文档仅因词多而占优 (参数 b 控制)

## 工程实现要点

```python
from rank_bm25 import BM25Okapi
import jieba

corpus = ["RAG 结合检索与生成技术", "BM25 是经典的稀疏检索算法"]
tokenized = [list(jieba.cut(doc)) for doc in corpus]

bm25 = BM25Okapi(tokenized)
scores = bm25.get_scores(list(jieba.cut("什么是 BM25 算法")))
```

- **中文分词是前提**：BM25 以词为单位，中文需先分词 (jieba / IK)，分词质量直接决定召回质量
- **停用词与同义词**：过滤停用词减少噪音；维护同义词表可部分弥补“不懂语义”的短板
- **生产选型**：Elasticsearch / OpenSearch 默认打分即 BM25，无需自己实现
- **混合检索标配**：2026 年生产基线是 BM25 + 向量检索并行召回，再用 RRF (倒数排名融合) 或 Cross-Encoder 重排序合并结果

## 与向量检索对比

| 维度 | 布尔/BM25 检索 | 向量检索 |
|:---|:---|:---|
| 匹配方式 | 词项精确匹配 | 语义相似度 |
| 专有名词、错误码 | ✅ 精准命中 | ❌ 容易漏检 |
| 同义改写 | ❌ 换个说法就查不到 | ✅ 语义命中 |
| 可解释性 | ✅ 命中词高亮即可解释 | ❌ 难解释 |
| 索引成本 | 低，无需 GPU | 高，需 Embedding 推理 |
| 增量更新 | ✅ 即时生效 | ⚠️ 需重新编码 |

::: details e.g. 法律条文检索场景
律师查询“《民法典》第五百七十七条”时，需要的是精确命中该条文，任何“语义相近”的条文都是干扰项。这类编号、条款、案号密集的场景，BM25 是绝对主力，向量检索仅作为兜底补充。
:::

## 参考

- [BM25 - Wikipedia](https://en.wikipedia.org/wiki/Okapi_BM25)
- [Elasticsearch 相关性打分文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-similarity.html)
