# Java SE 基础高频

## String、StringBuffer、StringBuilder 的区别和使⽤场景

:::info 知识点
字符串操作类、底层区别、线程安全、应用场景
:::

:::details 解答
* 均为 final 修饰，不允许被继承，本质都是 `char[]` 字符数组实现；
* String 是不可变对象，StringBuffer、StringBuilder 是可变的；
* StringBuilder 无需加锁，所以效率较快，同时也失去了多线程安全性；
* StringBuffer 操作⽅法使⽤ synchronized `/ˈsɪŋkrənaɪzd/`，效率相对较低，但线程安全；

使⽤场景

* 操作少量的数据可以⽤ String，但常改变内容且操作数据较多的情况下最好不要，因为每次⽣成中间对象性能会降低；
* 单线程下操作大量字符串⽤ StringBuilder
* 多线程下，需要保证线程安全则⽤ StringBuffer
:::

## HashMap 底层数据结构

:::info 知识点
HashMap 底层实现、新旧版本数据结构变化
:::

:::details 解答

