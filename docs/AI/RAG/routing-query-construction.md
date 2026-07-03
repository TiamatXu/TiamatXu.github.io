# 路由与查询构建 Routing & Query Construction

> 真实系统的知识不会只在一个向量库里：精确数值在 SQL 数据库、关系链在图数据库、文档在向量库、实时资讯在网上。**路由**决定“去哪查”，**查询构建**负责把自然语言翻译成目标数据源的“方言”。

## 智能路由 (Routing)

### 逻辑路由

用 LLM 做分类器，按预定义规则把问题分发到数据源。用结构化输出保证路由结果可解析：

```python
ROUTES = {
    "sql":    "涉及精确数值、统计、报表字段的查询",
    "vector": "概念解释、制度内容、非结构化文档",
    "graph":  "股权、投融资等实体关系问题",
    "web":    "公司知识库之外的实时信息",
}

route = llm.invoke(
    f"将问题分类到 {list(ROUTES)} 之一,只输出类别名。\n问题:{question}"
)
```

### 语义路由

预先为每个路由准备若干“典型问题”并向量化；运行时计算用户问题与各路由中心的相似度，就近分发。无 LLM 调用、延迟低，但边界模糊的问题容易误判。

**选型**：路由类别少、边界清晰 → 语义路由省成本；类别多、需要理解意图 → 逻辑路由。两者也常叠加：语义路由粗分，置信度低时升级到 LLM 裁决。这个“按问题复杂度选管线”的思想推广开来就是 **Adaptive RAG**，见[高级 RAG 架构](./sophisticated-rag)。

## 查询构建 (Query Construction)

### Text-to-SQL

```sql
-- 用户:找 2023 年毛利率超过 30% 的项目
SELECT project_name, gross_margin
FROM finance_projects
WHERE fiscal_year = 2023 AND gross_margin > 0.3;
```

工程要点：把**表结构 (Schema) 和几行示例数据**放进提示词，准确率远高于只给表名；生成的 SQL 必须过白名单校验 (只允许 SELECT、限制表范围)，防注入与误操作。

### Text-to-Cypher

面向图数据库，处理“A 与 B 之间的关系路径”类问题，配合[知识图谱检索](./knowledge-graph-retrieval)使用。

### 自查询 (Self-Query)：语义 + 过滤条件

把一句话拆成“语义部分”与“结构化过滤条件”，分别送给向量检索与元数据过滤：

```python
# 用户:“审计部去年发布的资产减值制度”
query  = "资产减值损失计提政策"                     # → 向量检索
filter = {"department": "审计部", "year": 2025}    # → 元数据过滤,由 LLM 解析
results = vectorstore.search(query, filter=filter)
```

过滤条件的执行机制见[规则过滤检索](./rule-based-retrieval)——LLM 负责“翻译”，规则层负责“强制”。权限这类安全约束**不能**由 LLM 翻译产生，必须由服务端注入。

## 工程要点

| 问题 | 对策 |
|:---|:---|
| 生成的查询执行失败 | 把报错回传给 LLM 自我修正,重试 2~3 次 |
| 路由误判 | 低置信度时并行查多路,由重排序兜底 |
| 高频重复问题 | 缓存“问题 → 路由 + 查询”的解析结果 |
| 危险语句 | SQL 白名单校验;写操作一律拒绝 |

::: details e.g. 财务系统的一次路由决策
“2023 年总营收多少？”→ 逻辑路由判定 sql → Text-to-SQL 查报表库，返回精确数值；“研发方向是什么？”→ vector → 混合检索年报文本；“大股东和供应商 X 有没有关联？”→ graph → Text-to-Cypher 查股权图谱。三类问题走三条管线，各自用最擅长的方式作答。
:::

## 参考

- [LangChain Routing 文档](https://python.langchain.com/docs/how_to/routing/)
- [Self-Query Retriever](https://python.langchain.com/docs/how_to/self_query/)
