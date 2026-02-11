# 项目五：跨语言“数据管道 + 任务中心”

## 概念

做一个分布式“数据采集 + 清洗 + 推送”系统：
任务调度（Java）→ 分布式采集（Python）→ 结果回传（Kafka）→ 状态缓存（Redis）→ 管理控制台（Dubbo/ZK）。

## 优点

* 与你已有的 FastAPI + Kafka 架构经验契合；
* 模块天然跨语言；
* 每一步都可以展示一个设计模式；
* 业务逻辑真实且可不断扩展（数据源、采集策略、格式化逻辑）。

## 功能模块拆解

### 1️⃣ 采集任务管理

* 采集规则
* 周期调度

### 2️⃣ 分布式采集节点

* Python Worker
* 插件化采集器

### 3️⃣ 数据清洗与加工

* Kafka 流转
* 多阶段处理

### 4️⃣ 状态与监控

* Redis 状态
* ZK 协调

## 总结

> 如果你想“站在自己已有系统上进化”，这是最省力的一条路。

---

## 详细功能模块清单

### 1. 任务管理与调度中心 (Java Service)

- **API (Dubbo/REST)**:
  - `createTask(TaskDefinition)`: 创建新的采集任务。
  - `getTask(taskId)`: 获取任务详情和状态。
  - `startTask(taskId)`, `stopTask(taskId)`: 手动启停任务。
- **任务定义 (Task Definition)**:
  - 包含 `taskId`, `sourceUrl`, `cronExpression`, `parserPluginName`, `sinkType` (e.g., KAFKA, DATABASE) 等。
- **持久化**:
  - 使用数据库 (如 MySQL) 存储任务定义。
- **调度器 (Quartz)**:
  - 集成 Quartz 框架，根据任务的 `cronExpression` 定期触发。
  - 触发时，将一个包含 `taskId` 和 `sourceUrl` 的“作业”消息发送到 Kafka。

### 2. 分布式采集节点 (Python Worker)

- **作业消费**:
  - 作为 Kafka Consumer 订阅 `crawl-jobs-topic`。
- **插件化采集器 (Factory & Strategy Pattern)**:
  - `Downloader` 插件: `requests`, `playwright` (用于JS渲染页面)。
  - `Parser` 插件: `beautifulsoup`, `lxml`, `jsonpath`。
  - Worker 根据作业中的 `parserPluginName` 等信息，动态加载并组合插件。
- **数据回传**:
  - 采集并解析出的原始数据，被构造成统一格式后，发送到 Kafka 的 `raw-data-topic`。
- **状态上报**:
  - 任务开始、成功、失败等状态，通过 `task-status-update-topic` 上报。

### 3. 数据清洗与加工流水线 (Data Pipeline)

- **多阶段处理 (Pipeline Pattern)**:
  - **Consumer 1 (Cleansing)**: 订阅 `raw-data-topic`，进行数据清洗 (去HTML标签、处理异常字符)，然后将干净数据发送到
    `clean-data-topic`。
  - **Consumer 2 (Enrichment)**: (可选) 订阅 `clean-data-topic`，进行数据丰富 (e.g., 调用外部API补全信息)，然后发送到
    `enriched-data-topic`。
  - **Consumer 3 (Sink)**: 订阅最终的数据 Topic，将数据写入最终目的地 (如 Elasticsearch, 数据库, 文件系统)。

### 4. 状态与监控 (State & Monitoring)

- **任务实时状态 (Redis)**:
  - 使用 Hash 存储每个任务的运行时状态: `KEY: task_state:{taskId}`。
  - `FIELD`: `status`, `lastExecutionTime`, `successCount`, `failureCount`。
  - 任务管理中心和采集节点都会更新这个状态。
- **分布式协调 (ZooKeeper)**:
  - **分布式锁**: 防止多个采集节点同时处理同一个需要严格一次处理的作业 (如果业务需要)。
  - **配置管理**: 存储采集策略、插件配置等，实现动态更新。

---

## 分阶段开发计划 (Roadmap)

### 第一阶段：核心采集与回传 (Python)

- **目标**: 实现一个 Python 脚本，能根据指定的 URL 和解析规则采集数据，并把结果打印出来。
- **技术栈**: `Python` (requests, BeautifulSoup)
- **任务**:
  1. **[Worker]** 编写一个 `Crawler` 类，包含 `download(url)` 和 `parse(html)` 方法。
  2. **[Worker]** 实现一个简单的解析器，例如，提取新闻标题和链接。
  3. **[Worker]** 编写一个主函数，接收一个URL作为参数，执行采集并打印结果。
  4. **[测试]** 命令行运行 `python crawler.py <some_url>`，验证能正确输出。

### 第二阶段：引入消息驱动

- **目标**: 用 Kafka 解耦“任务下发”和“数据回传”，使采集过程异步化。
- **技术栈**: `Kafka`
- **任务**:
  1. **[Kafka]** 创建 `crawl-jobs-topic` 和 `raw-data-topic`。
  2. **[Producer]** 编写一个独立的 Python 脚本 `task_publisher.py`，用于向 `crawl-jobs-topic` 发送一个包含 URL 的消息。
  3. **[Worker]** 改造第一阶段的 `crawler.py`，使其作为 Consumer 订阅 `crawl-jobs-topic`。
  4. **[Worker]** 采集到的结果不再打印，而是作为 Producer 发送到 `raw-data-topic`。
  5. **[测试]** 编写一个简单的 `result_consumer.py` 订阅 `raw-data-topic` 并打印结果，验证整个流程通畅。

### 第三阶段：任务管理与调度

- **目标**: 建立一个 Java 服务来管理和调度采集任务。
- **技术栈**: `Java`, `Spring Boot`, `Quartz`, `MySQL`
- **任务**:
  1. **[Java]** 创建 Spring Boot 项目，并集成数据库 (JPA/MyBatis)。
  2. **[Java]** 设计 `TaskDefinition` 数据表，并创建增删改查 API。
  3. **[Java]** 集成 Quartz，编写一个 Job，该 Job 的功能是向 `crawl-jobs-topic` 发送任务消息。
  4. **[Java]** 实现“创建任务时动态注册 Cron Job 到 Quartz”的逻辑。
  5. **[测试]** 创建一个每分钟执行一次的采集任务，观察 Kafka 中是否每分钟都收到新的作业消息。

### 第四阶段：状态同步与多级流水线

- **目标**: 实现任务状态的实时追踪，并建立多级数据处理管道。
- **技术栈**: `Redis`
- **任务**:
  1. **[State]** 集成 Redis。当 Java 服务调度任务时，在 Redis 中初始化任务状态。
  2. **[Worker]** Python Worker 在开始/结束处理时，更新 Redis 中的任务状态。
  3. **[Pipeline]** 创建一个新的 Kafka Topic `clean-data-topic`。
  4. **[Pipeline]** 编写一个新的 Python 消费者 `cleaner.py`，它消费 `raw-data-topic`，进行清洗，然后将结果发送到
     `clean-data-topic`。
  5. **[API]** Java 服务的 `getTask` 接口应从 Redis 读取实时状态并返回。

### 第五阶段：服务化与协调

- **目标**: 引入 Dubbo 和 ZK，对系统进行服务化改造和分布式协调。
- **技术栈**: `Dubbo`, `ZooKeeper`
- **任务**:
  1. **[Dubbo]** 将 Java 的任务管理能力封装为 `TaskService` Dubbo 接口。
  2. **[ZK]** 使用 ZK 作为 Dubbo 的注册中心。
  3. **[ZK]** (可选) 在 Python Worker 中引入 ZK 客户端，用于获取动态配置或实现分布式锁，确保某些特殊任务的单点执行。
  4. **[Monitoring]** 为各个模块添加健康检查和关键指标监控。
