# 项目二：实时数据处理 / 监控平台（类似小型日志管道）

## 概念

**实时事件监控系统**：  
系统接收日志／行为数据 → Kafka 做流式传输 → Redis 缓存聚合 → 前端实时展示。

## 技术整合

| 技术         | 用法                                |
|------------|-----------------------------------|
| **Kafka**  | 日志/事件流通道。                         |
| **Redis**  | 实时计数、排行榜、窗口聚合。                    |
| **ZK**     | 管理消费组、分布式协调。                      |
| **Dubbo**  | 提供指标查询与控制的 RPC 接口。                |
| **Python** | 实现消费、聚合逻辑；可用异步流处理（FastStream）。    |
| **设计模式**   | 观察者（事件订阅）、策略（聚合算法）、单例（Redis 连接池）。 |

## 学习收获

* 熟悉 Kafka Stream 的使用模式；
* 实践 Redis 作为近实时缓存；
* 理解分布式协调；
* Java/Python 可以分别扮演“生产者”和“消费者”角色；
* 延伸可加报警模块、实时仪表盘。

## 功能模块拆解

### 1️⃣ 数据采集入口

* 日志
* 行为事件
* 指标数据

**技术**

* Kafka Producer
* Java / Python 都可

### 2️⃣ 流处理模块

* 实时聚合
* 窗口计算
* 去重 / 过滤

**技术**

* Kafka Consumer
* Python 异步处理

**设计模式**

* 策略模式（聚合算法）
* 管道模式

### 3️⃣ 缓存与指标存储

* 实时计数
* TopN
* 时间窗口结果

**技术**

* Redis（Hash / ZSet）

### 4️⃣ 查询与控制服务

* 查询实时指标
* 动态调整消费策略

**技术**

* Dubbo RPC
* ZK 管理消费组

## 总结

> 偏“数据工程 + 流计算”，系统复杂度略低于任务调度，但 Kafka + Redis 会练得很扎实。

---

## 详细功能模块清单

### 1. 数据采集层 (Ingestion)

- **数据格式 (JSON)**: 定义统一的事件格式，例如：
  `{ "eventType": "user_login", "userId": "u123", "timestamp": 1678886400, "data": { "platform": "iOS" } }`
- **Topic 规划**:
  - `raw-events-topic`: 接收所有原始事件。
- **Producer SDK (Java/Python)**: 提供一个简单的客户端库，用于发送上述格式的事件到 Kafka。

### 2. 流处理模块 (Stream Processor)

- **消费者 (Python - FastStream/Faust 或原生 Kafka 客户端)**:
  - 订阅 `raw-events-topic`。
- **处理逻辑 (按 `eventType` 分发)**:
  - **实时计数器**: 对 `user_login`, `page_view` 等事件进行计数。
    - Redis 操作: `HINCRBY metrics:counters user_login 1`
  - **窗口聚合**: 计算时间窗口内的数据，例如“每分钟的交易额”。
    - Redis 操作: 使用 `INCRBYFLOAT` 和带 TTL 的 Key，例如 `metrics:revenue:minute:202303151200`。
  - **Top-N 排行榜**: 统计“今日活跃用户”。
    - Redis 操作: `ZINCRBY metrics:leaderboards:daily_active_users 1 {userId}`。
  - **去重/过滤**: 过滤掉无效或重复的事件。

### 3. 缓存与指标存储 (Cache & Storage)

- **Redis Schema**:
  - **Counters (Hash)**: `metrics:counters` -> `field (eventType)`: `value (count)`
  - **Leaderboards (Sorted Set)**: `metrics:leaderboards:{name}` -> `member (itemId/userId)`: `score (count)`
  - **Windowed Stats (String/Hash)**: `metrics:{stat_name}:minute:{timestamp}` -> `value`

### 4. 查询与控制服务 (Query & Control API)

- **RESTful API (Java - Spring Boot)**:
  - `GET /api/v1/metrics/counter?name={eventName}`: 获取实时计数器值。
    - 从 Redis Hash 读取。
  - `GET /api/v1/metrics/leaderboard?name={boardName}&topN=10`: 获取 Top-N 排行榜。
    - 从 Redis Sorted Set (`ZREVRANGE`) 读取。
  - `GET /api/v1/metrics/window?name={statName}&minutes=5`: 获取最近5分钟的时间窗口数据。
- **RPC 接口 (Dubbo)**:
  - `MetricsService.getCounter(String name)`
  - `MetricsService.getTopN(String boardName, int topN)`

---

## 分阶段开发计划 (Roadmap)

### 第一阶段：核心数据管道 MVP

- **目标**: 搭建 Kafka 和 Redis，跑通 "生产 -> 消费 -> 聚合存储" 的最小闭环。
- **技术栈**: `Python`, `Kafka`, `Redis`
- **任务**:
  1. **[Producer]** 编写一个 Python 脚本，模拟产生 JSON 事件并发送到 `raw-events-topic`。
  2. **[Consumer]** 编写一个 Python 消费者，订阅 `raw-events-topic`。
  3. **[Consumer]** 实现最简单的聚合逻辑：对接收到的事件按 `eventType` 计数。
  4. **[Consumer]** 将计数结果实时更新到 Redis 的 `metrics:counters` Hash 中。
  5. **[测试]** 启动 Producer 和 Consumer，通过 `redis-cli` 验证计数值是否正确增加。

### 第二阶段：数据查询接口

- **目标**: 提供 API 以便外部系统可以查询聚合后的数据。
- **技术栈**: `Java`, `Spring Boot`, `Redis`
- **任务**:
  1. **[API]** 创建一个 Spring Boot 项目。
  2. **[API]** 连接到 Redis。
  3. **[API]** 实现 `GET /api/v1/metrics/counter` 接口，从 Redis 读取并返回计数值。
  4. **[测试]** 运行核心数据管道，同时调用此 API，验证可以实时获取最新数据。

### 第三阶段：丰富聚合能力

- **目标**: 在流处理模块中加入更复杂的聚合功能，如窗口和排行榜。
- **技术栈**: `Python`, `Redis`
- **任务**:
  1. **[Consumer]** 在 Python 消费者中增加排行榜逻辑 (使用 ZSet)。
  2. **[Consumer]** 增加时间窗口聚合逻辑（例如，使用带 TTL 的 Key 统计每分钟的数据）。
  3. **[API]** 在 Spring Boot 应用中增加对应的查询接口 `GET /metrics/leaderboard` 和 `GET /metrics/window`。
  4. **[测试]** 发送更多样化的数据，验证排行榜和窗口数据是否符合预期。

### 第四阶段：服务化与协调

- **目标**: 将查询服务改造为 Dubbo RPC 服务，并引入 ZK 进行服务治理。
- **技术栈**: `Dubbo`, `ZooKeeper`
- **任务**:
  1. **[API]** 定义 `MetricsService` 的 Dubbo 接口。
  2. **[API]** 将 Spring Boot 应用改造为 Dubbo Provider，实现 `MetricsService` 接口。
  3. **[ZK]** 使用 ZooKeeper 作为 Dubbo 的注册中心。
  4. **[Consumer]** (可选) Python 消费者可通过 ZK 发现并获取配置信息。
  5. **[测试]** 编写一个 Dubbo Consumer 示例来调用 `MetricsService`。

### 第五阶段：可视化与监控

- **目标**: 为实时数据提供一个简单直观的展示界面。
- **任务**:
  1. **[UI]** (可选) 使用 Vue 或 React 创建一个简单的前端项目。
  2. **[UI]** 在前端页面上，通过轮询或 WebSocket 调用后端 API。
  3. **[UI]** 使用图表库 (如 ECharts, Chart.js) 将实时计数、排行榜等数据动态展示出来。
  4. **[Monitoring]** 暴露应用的健康检查和关键指标 (如 Kafka 消费延迟)，以便监控。
