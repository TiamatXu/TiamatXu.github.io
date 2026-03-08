# Spring 框架高频

## Spring Bean 的作用域 (Scope)

:::info 知识点
Singleton、Prototype、Web 作用域
:::

* **Singleton**：默认。每个 IOC 容器仅一个实例；
* **Prototype**：原型。每次请求创建一个新实例；
* **Request/Session/GlobalSession**：仅在 Web 应用环境下有效。

## IOC 和 DI 的理解

:::info 知识点
控制反转、依赖注入、解耦
:::

* **IOC (Inversion of Control)**：控制反转。将对象的创建和生命周期交给 Spring 容器管理，而非程序手动 `new`；
* **DI (Dependency Injection)**：依赖注入。IOC 的具体实现方式，Spring 动态地将对象依赖的外部资源注入其中。

## Spring Bean 生命周期核心步骤

:::info 知识点
实例化、属性填充、初始化、销毁、Aware 接口
:::

1. **实例化**：利用反射创建对象；
2. **属性填充**：注入依赖；
3. **Aware 回调**：设置 BeanName、BeanFactory 等环境信息；
4. **初始化前置**：执行 `BeanPostProcessor.postProcessBeforeInitialization`；
5. **初始化**：执行自定义 init 方法；
6. **初始化后置**：执行 `BeanPostProcessor.postProcessAfterInitialization`（AOP 在此生成代理类）；
7. **销毁**：容器关闭时执行 destroy 方法。

## Spring 事务传播行为 (Propagation)

:::info 知识点
REQUIRED、REQUIRES_NEW、NESTED、SUPPORTS
:::

* **REQUIRED**：默认。若有事务则加入，无则新建；
* **REQUIRES_NEW**：新建事务，若有当前事务则挂起；
* **NESTED**：嵌套事务。外层回滚，内层必回滚；内层回滚可不影响外层。

## Spring Boot Starter 原理

:::info 知识点
自动装配、META-INF/spring.factories、Conditional 注解
:::

* **核心思想**：约定优于配置。
* **实现流程**：
    1. 扫描类路径下的 `META-INF/spring.factories`（或 `org.springframework.boot.autoconfigure.AutoConfiguration.imports`）；
    2. 加载定义的自动配置类；
    3. 配合 `@Conditional` 系列注解（如 `@ConditionalOnClass`）按需生效。

## Spring 如何解决循环依赖？

:::info 知识点
三级缓存、AOP 代理、早期暴露
:::

* **三级缓存**：
    1. **一级缓存 (singletonObjects)**：完整 Bean；
    2. **二级缓存 (earlySingletonObjects)**：实例化未初始化的 Bean；
    3. **三级缓存 (singletonFactories)**：Bean 工厂（用于处理 AOP 代理）；
* **原理**：通过提前暴露（三级缓存中的 ObjectFactory）来获取尚未填充属性的对象引用，仅支持 **Singleton** 且 **非构造函数注入**。
