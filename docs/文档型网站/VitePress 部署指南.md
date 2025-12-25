# VitePress 文档网站部署指南

## 第 1 步：准备项目文件

创建 `username.github.io (public)` 仓库，并在根目录下创建 `docs` 目录存放 `markdown` 文件。确保 `docs` 目录中只包含希望公开发布的内容。

最终公开仓库 `username.github.io` 中的项目结构如下：

```text
username.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml  流水线描述文件
├── docs/
│   ├── .vitepress/
│   │   └── config.ts
│   ├── tsconfig.json
│   └── 笔记/
│       └── ...
└── package.json
```

## 第 2 步：配置项目依赖和脚本

### `package.json`
在仓库的**根目录**下创建了 `/package.json` 文件，用来管理所有必需的依赖包和运行脚本。

```json
{
  "name": "tiamatxu-github-io",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "typescript": "^5.3.3",
    "vitepress": "^1.2.3"
  }
}
```

### `tsconfig.json`
在 `docs` 目录内创建 `/docs/tsconfig.json` 让 VitePress 正确处理 TypeScript 文件。

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "types": ["vite/client"],
    "strict": true
  },
  "include": ["./.vitepress/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `config.ts`
修改 `docs/.vitepress/config.ts` 文件，配置网站的导航和侧边栏显示内容。

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "我的知识库",
  description: "一个个人文档网站",
  base: '/', 

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/笔记/Linux/全局配置 ZSH & OhMyZsh' },
    ],
    sidebar: {
      '/笔记/': [
        {
          text: 'Linux 笔记',
          items: [
            { text: '全局配置 ZSH', link: '/笔记/Linux/全局配置 ZSH & OhMyZsh' },
            { text: 'Docker Zookeeper', link: '/笔记/Linux/Docker - zookeeper 集群编排' },
          ]
        }
      ]
    },
  }
})
```

## 第 3 步：设置自动化工作流

**自动部署关键**: 在 `.github/workflows/` 目录下创建 `deploy.yml` 文件。

这个工作流使用了 GitHub 官方推荐的 `actions/deploy-pages` 动作，它非常适合在仓库内部署 GitHub Pages，并且更加安全、简洁。

```yaml
name: Deploy VitePress Site to Pages

on:
  push:
    branches:
      - main # 当 main 分支有更新时触发
  workflow_dispatch: # 允许手动触发

# 指定工作流所需的权限
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果需要 git 最后更新时间等信息，则必需

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install Dependencies
        run: npm install

      - name: Build VitePress Site
        run: npm run docs:build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v4

      - name: Upload site artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 第 4 步：配置 GitHub Pages

最后一步是在 `username.github.io` 仓库的设置中，告诉 GitHub Pages 使用刚刚创建的 Actions 来部署网站。

1.  进入仓库的 `Settings` -> `Pages`。
2.  在 `Build and deployment` -> `Source` 选项中，选择 **`GitHub Actions`**。

## Done!