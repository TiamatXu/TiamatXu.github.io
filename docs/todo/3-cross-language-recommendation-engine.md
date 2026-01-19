# 项目三：跨语言“推荐 / 排序 / 推送引擎”

## 概念

构建一个**智能推荐系统**，例如内容推荐、商品推荐或动态推送。

Java 负责：

* 用户请求入口、缓存层、服务治理。

Python 负责：

* 模型推理（推荐算法）、特征计算。

## 技术整合

| 技术        | 作用                                     |
|-----------|----------------------------------------|
| **Dubbo** | Java 与 Python 服务之间 RPC 调用。             |
| **ZK**    | 服务注册发现。                                |
| **Kafka** | 用户行为事件流输入。                             |
| **Redis** | 热门内容缓存。                                |
| **设计模式**  | 策略模式（推荐算法选择）、装饰器模式（特征增强）、模板方法模式（推荐流程）。 |

## 学习收获

* 多语言微服务协作（Dubbo + Python）；
* 异步事件流（Kafka）；
* 分层架构 + 模式组合；
* 可以在后期接入 AI 模型做扩展。

## 功能模块拆解

### 1️⃣ 用户请求入口

* 拉取推荐结果
* 用户画像查询

**技术**

* Java 服务
* Dubbo Provider

### 2️⃣ 行为事件采集

* 点击 / 浏览 / 停留

**技术**

* Kafka Producer

### 3️⃣ 推荐策略服务（Python）

* 规则推荐
* 简单模型推理
* A/B 策略切换

**设计模式**

* 策略模式
* 装饰器（特征增强）

### 4️⃣ 推荐结果缓存

* 热推荐
* 个性化缓存

**技术**

* Redis

### 5️⃣ 服务治理

* 服务注册
* 灰度发布

**技术**

* ZK + Dubbo

## 总结

> 非常适合你想做「Java + Python 双语言职责分离」的目标，但对算法兴趣不大的话，学习效率略低。

---

## 详细功能模块清单

### 1. 行为事件采集层 (Event Ingestion)

- **事件格式 (JSON)**:
  `{ "userId": "u123", "itemId": "p789", "eventType": "view", "timestamp": 1678886400, "properties": { "duration": 30 } }`
- **Topic 规划 (Kafka)**:
  - `user-behavior-events-topic`: 接收所有用户行为日志。

### 2. 用户请求入口 (Java Service)

- **RESTful API (Spring Boot)**:
  - `GET /api/v1/recommendations/{userId}?scenario=for-you&count=10`: 获取个性化推荐结果。
- **缓存层 (Redis)**:
  - 推荐结果缓存: `KEY: reco:{scenario}:{userId}`, `VALUE: ["p1","p2","p3"]` (JSON Array), `TTL: 5 minutes`。
  - 热门商品/内容缓存: `KEY: hot-items`, `VALUE: ZSET of items`。
- **服务调用**:
  - 检查 Redis 缓存，命中则直接返回。
  - 未命中，则通过 Dubbo RPC 调用 Python 推荐服务。
  - 获取结果后，存入 Redis 缓存并返回给用户。

### 3. 推荐策略服务 (Python Service)

- **RPC 服务 (Dubbo Provider or gRPC/REST)**:
  - 接口: `get_recommendations(userId, scenario, count)`
- **策略模式实现**:
  - `Strategy` 接口: `recommend(userId, count)`
  - `HotItemsStrategy`: 返回热门榜单。
  - `UserCFStrategy`: 基于用户协同过滤的推荐。
  - `ItemCFStrategy`: 基于物品协同过滤的推荐。
  - 策略工厂根据 `scenario` 参数选择合适的策略。
- **特征/模型**:
  - 用户画像 (User Profile) 存储: Redis Hash `profile:{userId}`。
  - 物品相似度矩阵: Redis Hash 或其他 KV 存储。

### 4. 离线/近实时计算 (Offline/Near-real-time Jobs)

- **Kafka Consumer (Spark Streaming / Flink / Python)**:
  - 订阅 `user-behavior-events-topic`。
  - **任务1: 更新用户画像**: 聚合用户行为，更新 Redis 中的用户画像 (如偏好的类目)。
  - **任务2: 计算物品相似度**: 通过用户行为计算物品与物品之间的相似度得分。
  - **任务3: 更新热门榜单**: 实时/准实时更新 `hot-items` ZSET。

### 5. 服务治理 (Governance)

- **ZooKeeper**:
  - 作为 Dubbo 的注册中心，管理 Java 和 Python 服务的地址。

---

## 分阶段开发计划 (Roadmap)

### 第一阶段：核心推荐逻辑 (Python)

- **目标**: 在 Python 端实现一个最简单的推荐算法，并提供 API。
- **技术栈**: `Python`, `Flask/FastAPI`
- **任务**:
  1. **[Data]** 准备一些模拟数据 (用户、物品、行为)。
  2. **[Python]** 实现一个“热门商品推荐”策略 (`HotItemsStrategy`)，直接返回最受欢迎的商品列表。
  3. **[Python]** 使用 FastAPI 创建一个 RESTful API `GET /recommend/{userId}`，调用上述策略并返回结果。
  4. **[测试]** 通过 curl 或浏览器访问 API，确保能返回正确的推荐列表。

### 第二阶段：Java 服务与 RPC 调用

- **目标**: 搭建 Java 端入口服务，实现对 Python 服务的调用。
- **技术栈**: `Java`, `Spring Boot`, `RestTemplate/OkHttp`
- **任务**:
  1. **[Java]** 创建一个 Spring Boot 项目。
  2. **[Java]** 实现 `GET /api/v1/recommendations/{userId}` 接口。
  3. **[Java]** 在接口内部，通过 HTTP-Client 调用第一阶段搭建的 Python API。
  4. **[测试]** 调用 Java 接口，验证它能成功代理 Python 服务的返回结果。

### 第三阶段：引入缓存与事件流

- **目标**: 增加缓存以提升性能，并建立用户行为的收集管道。
- **技术栈**: `Redis`, `Kafka`
- **任务**:
  1. **[Java]** 集成 Redis，在推荐接口中增加缓存逻辑：先查 Redis，没有再调用 Python 服务。
  2. **[Java]** 集成 Kafka Producer，创建一个新的 API `POST /api/v1/events` 用于接收模拟的用户行为事件，并将事件发送到
     `user-behavior-events-topic`。
  3. **[Python]** (可选) 编写一个简单的 Kafka Consumer 脚本，订阅并打印收到的用户行为事件，验证事件流是否通畅。

### 第四阶段：服务化与多语言 RPC

- **目标**: 用 Dubbo 替代 HTTP 调用，实现更规范的服务治理。
- **技术栈**: `Dubbo`, `ZooKeeper`
- **任务**:
  1. **[Dubbo]** 定义 `RecommendationService` 的 Dubbo 接口 (in a shared `api` jar)。
  2. **[Python]** 改造 FastAPI 应用，使用 Python 的 Dubbo 库将其注册为 `RecommendationService` 的 Provider。
  3. **[Java]** 改造 Spring Boot 应用，移除 HTTP 调用，改为 Dubbo Consumer，通过 RPC 接口调用 Python 服务。
  4. **[ZK]** 部署 ZooKeeper 作为 Dubbo 的注册中心。

### 第五阶段：实现更智能的推荐策略

- **目标**: 利用收集到的用户行为数据，实现一个简单的协同过滤推荐。
- **技术栈**: `Python`, `Kafka`, `Redis`
- **任务**:
  1. **[Offline Job]** 编写一个 Python 脚本 (或 Spark/Flink 任务)，作为 Kafka Consumer 消费 `user-behavior-events-topic`
     的数据。
  2. **[Offline Job]** 该脚本负责计算物品之间的相似度，并将结果存入 Redis (e.g., `item-sim:{itemId}` -> Hash of similar
     items)。
  3. **[Python]** 在推荐服务中，新增一个 `ItemCFStrategy` 策略。
  4. **[Python]** 该策略根据用户的历史行为，从 Redis 查询物品相似度，生成推荐结果。
  5. **[API]** 扩展 Java API，允许通过参数选择不同的推荐策略/场景。
