---
title: GitHub 贡献图组件集成教程
---

# 集成教程

本教程将指导你如何在自己的 VitePress 项目或 Vue 3 项目中集成 GitHub 贡献图组件。

## 1. 环境准备

确保你的项目使用的是 Vue 3。

```bash
# 安装必要依赖
pnpm add date-fns node-fetch@2
pnpm add -D tsx @types/node-fetch@2
```

## 2. 获取数据脚本

在项目根目录创建 `scripts/fetch-contributions.ts`。

::: details 查看脚本内容
```typescript
import fetch from 'node-fetch'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { format } from 'date-fns'

const GITHUB_USERNAME = 'YourName'
const OUTPUT_FILE = join(process.cwd(), '.vitepress/theme/contribution-data.json')

// ... (省略具体实现，可参考源码)
```
:::

你可以通过运行以下命令来抓取数据：

```bash
npx tsx scripts/fetch-contributions.ts
```

## 3. 组件实现

你可以直接复制本站使用的 `ContributionGraph.vue` 组件。该组件支持：
- **响应式缩放**：通过 `:scale` 属性控制大小。
- **暗黑模式**：自动适配 VitePress 主题颜色。
- **局部滚动**：在移动端自动启用横向滚动。

## 4. 在文档中使用

在你的 `.md` 文件中直接引用：

```vue
<script setup>
import ContributionGraph from './components/ContributionGraph.vue'
</script>

<ContributionGraph githubUsername="YourName" />
```

## 5. 自动化更新 (可选)

建议将数据抓取脚本集成到 GitHub Actions 中，以便每天自动更新你的贡献数据。

```yaml
# .github/workflows/update-contributions.yml
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm run fetch-contributions
      - # 提交并推送更改...
```
