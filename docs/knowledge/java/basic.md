# Java SE 基础高频

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














