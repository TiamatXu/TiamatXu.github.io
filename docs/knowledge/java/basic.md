# Java SE 基础

## String、StringBuffer、StringBuilder 的区别和使⽤场景

:::info 知识点
字符串操作类、底层区别、线程安全、应用场景
:::

* 均为 final 修饰，不允许被继承，本质都是 `char[]` 字符数组实现；
* String 是不可变对象，StringBuffer、StringBuilder 是可变的；
* StringBuilder 无需加锁，所以效率较快，同时也失去了多线程安全性；
* StringBuffer 操作⽅法使⽤ synchronized `/ˈsɪŋkrənaɪzd/`，效率相对较低，但线程安全；

**使⽤场景**

* 操作少量的数据可以⽤ String，但常改变内容且操作数据较多的情况下最好不要，因为每次⽣成中间对象性能会降低；
* 单线程下操作大量字符串⽤ StringBuilder
* 多线程下，需要保证线程安全则⽤ StringBuffer

## HashMap 底层数据结构是什么？为什么？

:::info 知识点
HashMap 底层实现、新旧版本数据结构变化
:::

* 数据结构：数组 `Node<K,V>[] table` + 链表 + 红黑树，`hash(key)` 决定对象位置；
* 链表：解决 hash 冲突，将 hash 一样的对象存储为链表，放在对应 hash 槽位；
* hash 不可避免会产生碰撞，相同 key 的位置链表长度过长，当对该位置进行查询时，就会循环遍历这个长链表，会导致查询效率降低；
* JDK8 之后，使用红黑树来替代 **超过 8 个节点** 的链表，以提高查询效率： `O(n) -> O(log n)`；

**数据结构**

::: code-group
```java [LinkedListNode]
static class Node<K,V> implements Map.Entry<K,V> { 
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}
```

```java [RedBlackTreeNode]
static final class TreeNode<K, V> extends LinkedHashMap.Entry<K, V> {
    TreeNode<K, V> parent;  // red-black tree links
    TreeNode<K, V> left;
    TreeNode<K, V> right;
    TreeNode<K, V> prev;    // needed to unlink next upon deletion
    boolean red;
}
```
:::

## Java 接口是否支持多继承？接口里面是否可以有方法实现？

:::info 知识点
接口多继承、default 关键字、static 方法
:::

* 接口**支持多继承**：一个接口可以 `extends` 多个接口；
* 类**不支持多继承**：一个类只能 `extends` 一个父类，但可以 `implements` 多个接口；
* **方法实现**：JDK 8 之前接口只能有抽象方法；JDK 8 之后引入了 `default` 默认实现方法和 `static` 静态方法。

## Vector、ArrayList、LinkedList 的区别和使⽤场景

:::info 知识点
List 实现类、底层结构、线程安全、性能差异
:::

* **ArrayList/Vector**：基于动态数组实现。ArrayList 非线程安全，性能高；Vector 线程安全（synchronized），性能低；
* **LinkedList**：基于双向链表实现，非线程安全；
* **访问速度**：ArrayList 支持随机访问 `O(1)`；LinkedList 需遍历 `O(n)`；
* **插入/删除**：ArrayList 末尾快，中间慢（需移动数据）；LinkedList 仅修改指针，效率较高（但在已知位置的前提下）；
* **扩容**：ArrayList 默认 1.5 倍；Vector 默认 2 倍。

**使用场景**

* 频繁随机访问、末尾追加数据：ArrayList
* 频繁在中间位置插入、删除：LinkedList
* 必须保证线程安全（旧代码）：Vector

## 如果需要保证线程安全，ArrayList 该怎么做？

:::info 知识点
线程安全集合、Collections 工具类、JUC 容器
:::

* 方式一：使用 `Vector`（不推荐，锁粒度大）；
* 方式二：使用 `Collections.synchronizedList(new ArrayList<>())`；
* 方式三：使用 `CopyOnWriteArrayList`（JUC 包，读写分离，适合读多写少）；
* 方式四：手动在操作位置加 `ReentrantLock` 或 `synchronized`。

## 对象的 hashCode() 和 equals()，使用场景

:::info 知识点
对象比较、哈希冲突、重写规则
:::

* **equals**：比较两个对象内容是否相等。默认比较内存地址（等同于 `==`）；
* **hashCode**：返回对象的哈希码（int），用于确定对象在哈希表（如 HashMap）中的索引位置；
* **核心约定**：
    * `equals` 为 true，则 `hashCode` **必须相等**；
    * `hashCode` 相等，`equals` **不一定为 true**（存在哈希碰撞）；
* **场景**：重写 `equals` 时必须重写 `hashCode`，否则会导致 HashMap 等集合存取异常。

## HashMap、TreeMap 底层结构和使用场景

:::info 知识点
Map 实现类、排序机制、查找性能
:::

* **HashMap**：数组+链表+红黑树。无序，查询/插入 `O(1)`。适合快速查找；
* **TreeMap**：红黑树。按 key 自然顺序或 Comparator 排序，查询/插入 `O(log n)`。适合范围查找或有序遍历。

## ConcurrentHashMap 为什么性能比 Hashtable 高？

:::info 知识点
并发容器、锁分段、CAS 无锁技术
:::

* **Hashtable**：全表锁（synchronized 方法），同一时间仅允许一个线程访问，效率极低；
* **ConcurrentHashMap (JDK 7)**：**分段锁 (Segment)**。锁粒度为 Segment（默认 16 个），降低锁竞争；
* **ConcurrentHashMap (JDK 8+)**：**Node 数组 + CAS + synchronized**。
    * 取消 Segment，锁粒度细化到**每个桶 (Node)**；
    * 仅在哈希碰撞时才对链表/红黑树头节点加锁；
    * 读操作无锁，扩容支持并发。

## 什么是 Java 泛型？常用通配符有哪些？

:::info 知识点
泛型原理、类型安全、通配符区别
:::

* **泛型 (Generics)**：本质是参数化类型。在编译时检查类型安全，并自动进行强制类型转换，避免了运行时 `ClassCastException`；
* **类型擦除**：Java 泛型是伪泛型，编译后会将类型参数擦除（替换为 Object 或上限类型），并在字节码中插入强制转换逻辑；
* **通配符**：
    * `<?>`：无界通配符，表示可以接收任意类型；
    * `<? extends T>`：上界通配符。只能接收 T 或其子类。适合**频繁读取**（Get）的场景；
    * `<? super T>`：下界通配符。只能接收 T 或其父类。适合**频繁写入**（Add）的场景。

## 介绍下 Java 反射技术及常用 API

:::info 知识点
动态获取信息、字节码操作、反射性能
:::

* **定义**：在运行状态中，对于任意一个类，都能知道其所有属性和方法；对于任意一个对象，都能调用其任意方法和属性；
* **核心 API**：
    * `Class`：获取类对象（`Class.forName()`, `.class`, `getClass()`）；
    * `Constructor`：操作构造方法（`newInstance()`）；
    * `Field`：操作成员变量（`setAccessible(true)` 暴力反射）；
    * `Method`：操作方法（`invoke()`）；
* **缺点**：涉及类型检查和解释执行，性能比直接调用略低；且破坏了封装性。

## Java 自带的注解有哪些？什么是元注解？

:::info 知识点
内置注解、自定义注解、元注解作用
:::

* **内置注解**：`@Override`（检查重写）、`@Deprecated`（标记过时）、`@SuppressWarnings`（忽略警告）；
* **元注解**（修饰注解的注解）：
    * `@Target`：指定注解应用的位置（类、方法、字段等）；
    * `@Retention`：指定生命周期（`SOURCE` 源码、`CLASS` 字节码、`RUNTIME` 运行时）；
    * `@Documented`：是否包含在 Javadoc 中；
    * `@Inherited`：是否允许子类继承父类注解。

## 静态代理与动态代理的区别

:::info 知识点
代理模式、JDK 动态代理、CGLIB
:::

* **静态代理**：手动编写代理类，与目标类实现相同接口。代码冗余度高，不易维护；
* **动态代理**：
    * **JDK 动态代理**：利用反射机制生成实现接口的代理类。目标类**必须实现接口**；
    * **CGLIB 动态代理**：通过继承目标类生成子类代理。目标类**无需实现接口**，但不能是 final 类。

**核心方法**

::: code-group
```java [JDK Proxy]
// 核心接口
public interface InvocationHandler {
    Object invoke(Object proxy, Method method, Object[] args);
}
```

```java [CGLIB]
// 核心接口
public interface MethodInterceptor {
    Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy);
}
```
:::
