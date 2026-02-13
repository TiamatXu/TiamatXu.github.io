# 📌 项目级 Prompt：VitePress Linux 命令语义化构建与参数动态组装系统

## 1️⃣ 项目背景（Background）

我正在使用 **VitePress（Vue 3 + Vite）** 构建一个**纯静态技术文档网站**，其中包含一个 **Linux 命令专栏**。

该专栏**不是简单的命令展示**，而是一个：

* 支持 **Linux 命令参数语义化**
* 支持 **参数解释**
* 支持 **参数规则校验**
* 支持 **参数动态选择并实时组装命令**
* 支持 **不同 Linux 发行版差异（Ubuntu / CentOS 等）**
* 支持 **一键复制最终命令**

的**命令构建与教学系统（Command Builder / Command DSL）**。

网站整体是 **纯静态部署（CDN / GitHub Pages）**，
但允许在 **构建期（Vite）做数据转换与编译**。

---

## 2️⃣ 总体设计原则（Core Principles）

请严格遵守以下原则：

1. **命令 ≠ 字符串**

   * 命令必须建模为结构化语义对象
   * UI 永远操作结构化数据
   * 字符串只是最终输出结果

2. **数据是静态的、可版本控制的**

   * 命令数据存储在 YAML / Markdown 中
   * Git 是唯一数据源
   * 不依赖运行时后端 API

3. **规则前置，而不是事后校验**

   * 参数依赖、冲突、互斥在模型中声明
   * UI 层根据规则动态禁用 / 自动补全

4. **渐进式复杂度**

   * 允许从最小功能集开始
   * 但数据模型必须支持未来扩展

---

## 3️⃣ 技术栈与约束（Tech Stack & Constraints）

### 已确定技术栈

* VitePress
* Vue 3（Composition API）
* TypeScript
* YAML 作为命令数据源
* Vite 构建期插件（如 `@rollup/plugin-yaml`）

### 明确不做的事情

* ❌ 不引入运行时后端
* ❌ 不做用户登录 / 权限
* ❌ 不做在线编辑
* ❌ 不做字符串反解析（如解析用户输入的命令）

---

## 4️⃣ 命令系统的核心目标（What to Build）

### 每一条命令必须支持：

1. **命令元信息**

   * 名称
   * 描述
   * 分类

2. **参数系统**

   * boolean 参数（`-a`）
   * 带值参数（`-o file`）
   * enum 参数（`--color=auto|always|never`）
   * 位置参数（path / file / pattern）

3. **参数语义解释**

   * 每个参数有明确说明
   * UI 可展示选中参数的含义

4. **参数规则**

   * requires（依赖）
   * conflicts（冲突）
   * exclusive group（互斥组）

5. **发行版差异（variants）**

   * 某些参数只在特定系统可用
   * 安装方式不同

6. **命令动态组装**

   * UI 选项变化 → 实时生成命令
   * 自动补全依赖参数

---

## 5️⃣ 命令数据模型（YAML 规范）

请基于以下模型设计，并可在此基础上合理扩展。

### 示例：`ls.yaml`

```yaml
name: ls
desc: 列出目录内容
category: filesystem

arguments:
  - name: path
    type: path
    required: false
    multiple: false
    default: .
    desc: 要列出的目录路径

options:
  - flag: -l
    long: --long
    type: boolean
    desc: 使用长格式显示文件信息

  - flag: -a
    long: --all
    type: boolean
    desc: 显示隐藏文件

  - flag: -h
    type: boolean
    desc: 以人类可读方式显示大小
    requires:
      - -l

rules:
  - type: conflicts
    flags: [-c, -u]

variants:
  ubuntu:
    availableOptions: [-l, -a, -h]
    install: sudo apt install coreutils

  centos:
    availableOptions: [-l, -a]
    install: sudo yum install coreutils
```

---

## 6️⃣ 运行时状态模型（Runtime State）

前端运行时请使用结构化状态，不使用字符串：

```ts
interface CommandState {
  command: string
  system: 'ubuntu' | 'centos'
  options: Set<string>
  args: Record<string, any>
}
```

---

## 7️⃣ 命令构建器逻辑（Command Builder）

### 要求：

* 输入：`CommandState`
* 输出：最终命令字符串
* 不做字符串解析
* 不依赖 DOM

```ts
function buildCommand(state: CommandState): string
```

---

## 8️⃣ 参数规则引擎（Minimal Rule Engine）

至少支持以下规则类型：

* requires
* conflicts
* exclusiveGroup

### 能力要求：

* UI 层可查询某参数是否可选
* 自动补全依赖参数
* 非法组合可提前禁用

---

## 9️⃣ UI 组件设计建议（Vue）

建议但不强制采用以下结构：

```
CommandBuilder.vue
├─ SystemSelector.vue
├─ OptionList.vue
│  └─ OptionToggle.vue
├─ ArgumentInput.vue
├─ CommandPreview.vue
└─ CopyButton.vue
```

### UI 行为要求：

* 参数选中时展示解释
* 不可选参数置灰并说明原因
* 命令实时更新
* 一键复制可用

---

## 🔟 构建期数据处理（Vite）

### 要求：

* YAML 在构建期转换为 JS 对象
* 前端可直接 import 或 fetch JSON
* 不在浏览器解析 YAML

---

## 1️⃣1️⃣ 阶段性开发建议（Milestones）

### 第一阶段（MVP）

* 支持 boolean 参数
* requires / conflicts
* 单位置参数
* 2 个命令（如 ls / grep）

### 第二阶段

* 带值参数
* enum 参数
* variants 差异

### 第三阶段（可选）

* 参数搜索
* 参数推荐
* 教学模式（“我想做什么？”）

---

## 1️⃣2️⃣ 输出期望（What You Should Produce）

请协助完成以下内容（可分步骤输出）：

1. 命令 YAML Schema 设计
2. TypeScript 类型定义
3. 最小规则引擎实现
4. CommandBuilder 核心逻辑
5. 可直接用于 VitePress 的 Vue 组件骨架

---

## 1️⃣3️⃣ 风格与要求（Important）

* 偏工程化、可维护
* 避免“玩具级”示例
* 代码可直接落地
* 优先清晰 > 花哨
* 不引入无必要依赖

---

### ✅ 最终目标总结（一句话）

> 在 **纯静态 VitePress 环境中**，构建一个
> **可维护、可扩展、语义化的 Linux 命令参数构建与教学系统**。
