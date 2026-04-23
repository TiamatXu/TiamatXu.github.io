# 并发编程高频

## 常见的锁种类

:::info 知识点
悲观锁/乐观锁、公平/非公平、独享/共享、重入、自旋、分段、死锁
:::

* **悲观锁 vs 乐观锁**：
    * **悲观锁**：假定冲突必发生，访问前先加锁（如 `synchronized`、`ReentrantLock`）；
    * **乐观锁**：假定无冲突，操作后检查版本（如 CAS 机制）。适合读多写少；
* **公平锁 vs 非公平锁**：
    * **公平锁**：按申请顺序获取（如 `new ReentrantLock(true)`），避免线程饥饿；
    * **非公平锁**：抢占式获取，性能高但可能导致饥饿。`synchronized` 仅支持非公平；
* **独享锁（排他） vs 共享锁**：
    * **独享锁**：同一时间仅一个线程持有（如写锁）；
    * **共享锁**：多个线程可同时持有（如 `ReadWriteLock` 的读锁）；
* **可重入锁**：允许同一线程多次获得同一把锁，避免死锁（如 `synchronized`）；
* **自旋锁**：不阻塞线程，循环尝试获取，避免用户态/内核态切换开销，适合短时操作。

## ReentrantLock 是公平锁还是非公平锁？

:::info 知识点
AQS、同步队列、默认配置
:::

* **默认配置**：默认是**非公平锁**（性能更好，重用 CPU 时间片）；
* **实现原理**：基于 AQS（AbstractQueuedSynchronizer）实现。通过构造函数参数控制；
* **区别**：公平锁在抢锁前会调用 `hasQueuedPrecessors()` 检查是否有前驱节点在排队。

## 对象锁 vs 类锁

:::info 知识点
synchronized 作用域、代码块与方法、锁范围
:::

* **对象锁**：`synchronized(this)` 或同步实例方法。作用于**当前对象实例**，不同实例间互不干扰；
* **类锁**：`synchronized(xxx.class)` 或静态同步方法。作用于**整个类**，该类的所有实例共享此锁。

## 死锁的四个必要条件及排查思路

:::info 知识点
互斥、请求保持、不剥夺、循环等待、jstack
:::

* **必要条件**：互斥、请求并保持、不可剥夺、循环等待。只要破坏其中一个（如按序申请、超时释放）即可避免；
* **排查工具**：
    1. `jps -l`：定位进程 ID；
    2. `jstack [pid]`：查看堆栈信息，寻找 "Found 1 deadlock" 字样；
    3. `jconsole`：图形化工具查看线程死锁。

## ThreadLocal 的原理及内存泄漏场景

:::info 知识点
ThreadLocalMap、弱引用、Key/Value 生命周期
:::

* **原理**：每个线程维护一个 `ThreadLocalMap`，Key 为 `ThreadLocal` 实例，Value 为存储的值；
* **弱引用**：Key 是弱引用，Value 是强引用。当 ThreadLocal 被回收，Key 变 null，但 Value 可能长期存在导致**内存泄漏**；
* **解决**：使用完必须手动调用 `remove()`。

## ThreadPoolExecutor 核心参数及其作用

:::info 知识点
核心/最大线程、容量、拒绝策略、任务队列
:::

* **核心参数**：
    * `corePoolSize`：核心线程数（常驻）；
    * `maximumPoolSize`：最大线程数；
    * `keepAliveTime/unit`：非核心线程闲置存活时间；
    * `workQueue`：阻塞任务队列（ArrayBlockingQueue, LinkedBlockingQueue 等）；
    * `threadFactory`：创建线程的工厂；
    * `handler`：拒绝策略（Abort, CallerRuns, Discard, DiscardOldest）。

## 为什么要用池化思想？

:::info 知识点
资源复用、控制开销、管理便捷
:::

* **降低开销**：避免频繁创建/销毁线程的系统调用；
* **提高响应**：任务到达时无需等待创建；
* **控制并发**：防止无限制创建导致 OOM。

## CompletableFuture 的用途

:::info 知识点
异步编排、链式调用、任务依赖
:::

* **非阻塞**：结合 `Future` 和 `CompletionStage` 接口，支持回调；
* **任务链**：支持 `thenApply` (转换)、`thenCompose` (串行)、`thenCombine` (并行汇总) 等链式操作。
