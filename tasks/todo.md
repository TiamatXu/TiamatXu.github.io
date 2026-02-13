# 📋 Linux 命令语义化构建系统开发计划 (Bash 项目)

## 🏗️ 第一阶段：基础架构设计 (MVP)
- [x] 创建目录 `.vitepress/theme/bash`
- [x] 定义 TypeScript 类型接口 (`.vitepress/theme/bash/types.ts`)
- [x] 创建基础测试数据 (`docs/linux/commands/ls.yaml`)
- [x] 安装并配置 `@rollup/plugin-yaml`
- [x] 完善 `env.d.ts` 以支持 `.yaml` 导入

## ⚙️ 第二阶段：核心逻辑实现
- [x] 开发核心命令构建引擎 (`.vitepress/theme/bash/builder.ts`)
- [x] 实现参数规则引擎 (requires, conflicts, exclusiveGroup)

## 🎨 第三阶段：UI 组件开发 (位于 `.vitepress/theme/bash/components`)
- [x] 开发 `CommandBuilder.vue` 容器组件
- [x] 开发子组件 (`OptionToggle.vue`, `ArgumentInput.vue`, `CommandPreview.vue`)

## 🔗 第四阶段：集成与展示
- [x] 在 `docs/linux/bash-builder.md` 页面集成组件
- [x] 将页面添加到 VitePress 侧边栏
- [x] 确保样式与现有主题统一

## 🧪 第五阶段：验证与优化
- [x] 增加多命令支持 (ls, grep)
- [x] 执行 `pnpm run build` 验证构建通过
- [x] 移动端适配 (通过 CSS grid 自动适配)
- [x] 更新 `tasks/lessons.md`
