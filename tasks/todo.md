# 📋 Linux 命令语义化构建系统开发计划

## 🏗️ 第一阶段：基础架构设计 (MVP)
- [ ] 定义命令 YAML 数据模型规范 (Schema)
- [ ] 定义 TypeScript 类型接口 (`/src/types/command.ts`)
- [ ] 创建基础测试数据 (`docs/linux/commands/ls.yaml`, `grep.yaml`)
- [ ] 配置 Vite 插件以支持 YAML 直接导入

## ⚙️ 第二阶段：核心逻辑实现
- [ ] 实现命令状态管理器 (Command State Management)
- [ ] 开发核心命令构建引擎 (`buildCommand` 函数)
- [ ] 实现基础规则引擎 (支持 `requires`, `conflicts`, `exclusiveGroup`)

## 🎨 第三阶段：UI 组件开发
- [ ] 开发 `CommandBuilder.vue` 容器组件
- [ ] 开发 `SystemSelector.vue` (系统选择)
- [ ] 开发 `OptionList.vue` & `OptionToggle.vue` (参数开关)
- [ ] 开发 `CommandPreview.vue` (实时预览与复制)

## 🔗 第四阶段：VitePress 集成与增强
- [ ] 在 Markdown 中集成自定义组件
- [ ] 优化移动端适配与样式
- [ ] 增加参数语义解释浮层 (Tooltip)

## 🧪 第五阶段：验证与优化
- [ ] 编写单元测试验证规则引擎
- [ ] 完善文档说明
- [ ] 收集反馈并更新 `tasks/lessons.md`
