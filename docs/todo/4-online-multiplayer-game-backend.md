# 项目四：在线多人对战游戏后端（轻量级版本）

## 概念

实现一个**回合制或实时匹配系统**的服务端（比如小型象棋对战平台）。

## 技术整合

| 技术         | 用法                                 |
|------------|------------------------------------|
| **ZK**     | 管理在线游戏节点、房间状态。                     |
| **Redis**  | 存储玩家状态、排行榜、匹配队列。                   |
| **Kafka**  | 异步事件（战斗日志、匹配请求）。                   |
| **Dubbo**  | 游戏逻辑服务（匹配、结算）。                     |
| **Python** | 实现 AI 对手或回放分析。                     |
| **设计模式**   | 命令模式（玩家操作）、状态模式（房间状态）、观察者模式（事件广播）。 |

## 学习收获

* 学分布式房间协调；
* 学缓存与实时同步；
* 学 RPC 与消息队列组合；
* 最重要：有趣、能展示。

## 功能模块拆解

### 1️⃣ 匹配服务

* 排队
* 匹配规则

**技术**

* Redis ZSet
* Dubbo

### 2️⃣ 房间管理

* 房间状态
* 成员同步

**技术**

* ZK（房间节点）
* Redis

**设计模式**

* 状态模式

### 3️⃣ 事件驱动

* 玩家操作
* 战斗日志

**技术**

* Kafka

### 4️⃣ AI / 回放分析（Python）

* AI 决策
* 对局分析

## 总结

> 有趣，但工程“可复用性”略低，更偏兴趣项目。

---

## 详细功能模块清单

### 1. 用户与匹配服务 (User & Matchmaking Service)

- **API (REST/Dubbo)**:
  - `POST /api/v1/matchmaking/join`: 用户加入匹配队列。
  - `POST /api/v1/matchmaking/leave`: 用户离开匹配队列。
- **匹配队列 (Redis)**:
  - 使用 Sorted Set: `KEY: matchmaking:queue:{game_type}`, `SCORE: player_elo`, `VALUE: userId`。
- **匹配器 (Background Worker)**:
  - 一个独立的后台线程或进程。
  - 定期扫描 ZSet，寻找分数相近的玩家。
  - 找到匹配后，创建房间，并将玩家从队列中移除。

### 2. 房间与游戏状态管理 (Room & Game State)

- **房间状态 (ZooKeeper)**:
  - 成功匹配后，在 ZK 创建一个临时有序节点: `/rooms/{game_type}/{roomId}`。
  - 节点数据:
    `{ "players": ["u1", "u2"], "status": "WAITING_FOR_PLAYERS | IN_PROGRESS | FINISHED", "gameServer": "server_node_1" }`。
- **游戏实时状态 (Redis)**:
  - 使用 Hash 存储棋盘/战局信息: `KEY: game_state:{roomId}`.
  - `FIELD`: `board` (e.g., JSON string of the board), `currentPlayer`, `lastMoveTimestamp`.
- **实时通信 (WebSocket/Netty)**:
  - 玩家通过 WebSocket 连接到指定的游戏服务器 (`gameServer`) 的房间。
  - 服务器在游戏状态变更后 (如一方落子)，通过 WebSocket 将最新状态广播给房间内所有玩家。

### 3. 游戏逻辑服务 (Game Logic Service)

- **核心逻辑 (Java)**:
  - **命令模式**: `MoveCommand`, `SurrenderCommand`。
  - **状态模式**: `GameState` (Waiting, InProgress, Finished)。
  - 接收玩家通过 WebSocket 发来的命令。
  - 验证命令合法性 (e.g., 是不是该玩家的回合，移动是否符合规则)。
  - 更新 Redis 中的游戏状态。
  - 广播新状态。
  - 游戏结束后，计算得分，更新用户ELO等级等。

### 4. 异步事件与数据分析 (Async Events & Analytics)

- **事件日志 (Kafka)**:
  - 关键游戏事件 (对局开始、每一步操作、对局结束、得分) 都被格式化为 JSON 并发送到 Kafka Topic。
  - Topic: `game-events-log-topic`.
- **AI / 回放服务 (Python)**:
  - 作为 Kafka Consumer 订阅 `game-events-log-topic`。
  - **回放**: 按顺序消费一个 `roomId` 的所有事件，即可重现对局。
  - **AI 对手**: 如果是人机对战，Python 服务作为一个 "玩家" 连接到游戏服务器，接收状态广播，根据当前局势计算最佳步骤，并通过
    WebSocket 发送 `MoveCommand`。

---

## 分阶段开发计划 (Roadmap)

### 第一阶段：核心游戏逻辑 (单机版)

- **目标**: 实现一个本地可玩的、回合制的游戏核心逻辑。
- **技术栈**: `Java`, `Redis`
- **任务**:
  1. **[Game Logic]** 定义游戏规则 (以井字棋/五子棋为例)。
  2. **[Game Logic]** 创建 `GameState` 类，并实现 `makeMove` 等核心方法。
  3. **[State]** 使用 Redis Hash 结构来存储和读取 `GameState`。
  4. **[API]** 编写一个简单的 Spring Boot 应用，提供 RESTful API: `POST /games` (创建游戏), `GET /games/{id}` (获取状态),
     `POST /games/{id}/move` (执行一步)。
  5. **[测试]** 通过 curl 或 Postman 模拟两个玩家交替调用 API，完成一局游戏。

### 第二阶段：引入匹配服务

- **目标**: 实现一个基于 Redis 的简单匹配系统。
- **技术栈**: `Redis`
- **任务**:
  1. **[API]** 增加 `POST /matchmaking/join` 接口，将 `userId` 添加到 Redis ZSet 匹配队列中。
  2. **[Matcher]** 编写一个后台线程，定期扫描匹配队列。
  3. **[Matcher]** 实现一个简单的匹配算法 (e.g., 取出队列头部的两个玩家)。
  4. **[Matcher]** 匹配成功后，自动调用 `POST /games` 创建游戏，并记录玩家与 `gameId` 的关系。

### 第三阶段：实现实时通信

- **目标**: 用 WebSocket 替代轮询 API，实现游戏状态的实时推送。
- **技术栈**: `Spring Boot WebSocket`
- **任务**:
  1. **[Server]** 在 Spring Boot 应用中集成 WebSocket 支持。
  2. **[Server]** 建立 WebSocket 端点 `/ws/game/{gameId}`。
  3. **[Client]** 编写一个简单的 HTML 页面或 WebSocket 客户端，用于连接、发送消息和接收广播。
  4. **[Server]** 改造游戏逻辑：当 `makeMove` 成功后，不再仅仅更新 Redis，而是通过 WebSocket 向该 `gameId`
     的所有连接客户端广播最新的游戏状态。

### 第四阶段：分布式协调与事件记录

- **目标**: 使用 ZK 管理房间信息，并用 Kafka 记录不可变的游戏日志。
- **技术栈**: `ZooKeeper`, `Kafka`
- **任务**:
  1. **[Room]** 匹配成功后，在 ZooKeeper 中创建一个代表“房间”的临时节点。
  2. **[Room]** 客户端可以（可选）通过 ZK 发现房间信息和对应的游戏服务器地址。
  3. **[Event]** 集成 Kafka Producer。
  4. **[Event]** 在游戏逻辑中，将每一个有效的 `move` 或游戏结束事件，都发送到 `game-events-log-topic`。
  5. **[Analytics]** (可选) 编写一个 Kafka Consumer 消费并打印事件，验证事件记录功能。

### 第五阶段：开发 AI 对手 (Python)

- **目标**: 制作一个简单的 AI，能作为玩家参与游戏。
- **技术栈**: `Python`
- **任务**:
  1. **[AI]** 创建一个 Python 项目。
  2. **[AI]** 实现一个 WebSocket 客户端，模拟真实玩家连接到指定的游戏房间。
  3. **[AI]** 编写 AI 核心逻辑：接收到游戏状态广播后，根据棋盘情况计算下一步的最佳位置 (e.g., Minimax 算法)。
  4. **[AI]** 将计算出的 `move` 通过 WebSocket 发送给服务器。
  5. **[Matchmaking]** (可选) 改造匹配服务，如果玩家等待超时，可以为其匹配一个 AI 对手。
