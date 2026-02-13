# 📓 经验教训 (Lessons Learned)

## 🛠️ Vite & YAML 集成
- 在 VitePress 中处理静态数据，YAML 比 JSON 更易读且易于 Git 版本管理。
- 使用 `@rollup/plugin-yaml` 可以轻松实现构建期数据转换，避免运行时解析开销。
- 必须在 `env.d.ts` 中声明 `*.yaml` 模块，否则 TypeScript 会报错。

## 🧩 语义化命令建模
- 将命令视为“结构化对象”而非“字符串”是该系统的核心。
- 规则引擎（requires/conflicts）应解耦于 UI，放在独立的工具函数中（如 `builder.ts`），方便测试和逻辑复用。
- 对于依赖项（requires），在 UI 层实现“自动补全选中”能极大提升用户体验。

## 🎨 样式与主题集成
- 尽量复用主题定义的 CSS 变量（如 `--vt-c-brand`），确保组件在深色模式和浅色模式下都能完美适配。
- 使用 `CSS Grid` 处理参数列表，可以轻松应对不同数量的参数并实现响应式布局。

## 🚀 性能优化
- 静态导入 YAML 数据并利用 Vue 的 `computed` 实时计算命令，性能极佳，完全能满足纯静态站点的需求。
