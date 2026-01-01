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
为了实现导航和侧边栏的自动化生成、国际化以及其他自定义功能，`config.ts` 文件现在会从 `./theme/index.ts` 导入 `nav` 和 `sidebar` 配置，并包含多语言支持、社交链接和主页配置示例。

首先，在 `.vitepress` 目录下创建 `theme` 文件夹，并在其中创建 `index.ts` 文件 (`docs/.vitepress/theme/index.ts`)。这个文件将负责动态生成导航和侧边栏。

#### `docs/.vitepress/theme/index.ts` 示例

```typescript
import { readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const docsDir = resolve(__dirname, '../../')

// Helper function to generate sidebar items from a directory
function getSidebarItems(dir: string, baseLink: string) {
  return readdirSync(dir)
    .filter(file => file.endsWith('.md') || statSync(join(dir, file)).isDirectory())
    .map(file => {
      const filePath = join(dir, file)
      const fileStat = statSync(filePath)
      if (fileStat.isDirectory()) {
        return {
          text: file,
          items: getSidebarItems(filePath, `${baseLink}/${file}`),
          collapsible: true,
        }
      }
      const text = file.replace('.md', '')
      const link = `${baseLink}/${text}`
      return { text, link }
    })
}

// Generate the sidebar object
function generateSidebar() {
  const sidebar: Record<string, any> = {}
  const topLevelDirs = readdirSync(docsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== '.vitepress' && dirent.name !== 'public')
    .map(dirent => dirent.name)

  topLevelDirs.forEach(dir => {
    const dirPath = join(docsDir, dir)
    sidebar[`/${dir}/`] = [
      {
        text: dir,
        items: getSidebarItems(dirPath, `/${dir}`),
        collapsible: true,
      },
    ]
  })
  return sidebar
}

// Generate the navigation bar items
function generateNav() {
  const topLevelDirs = readdirSync(docsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== '.vitepress' && dirent.name !== 'public')
    .map(dirent => dirent.name)

  const docsNav = {
    text: '文档',
    items: topLevelDirs.map(dir => {
      const dirPath = join(docsDir, dir)
      // Find the first markdown file to link to
      const firstFile = readdirSync(dirPath).find(file => file.endsWith('.md'))
      const link = firstFile ? `/${dir}/${firstFile.replace('.md', '')}` : `/${dir}/`
      return { text: dir, link }
    })
  }

  return [
    { text: '首页', link: '/' },
    docsNav,
    {
      text: '生态系统',
      items: [
        { text: '资源', link: '/ecosystem/resources' },
        { text: '社区', link: '/ecosystem/community' },
        { text: '贡献', link: '/ecosystem/contributing' },
      ],
    },
    { text: '团队', link: '/team' },
  ]
}

export const sidebar = generateSidebar()
export const nav = generateNav()
```

#### `docs/.vitepress/config.ts` 示例

```typescript
import { defineConfig } from 'vitepress'
import { nav, sidebar } from './theme/index'

export default defineConfig({
  title: "我的知识库",
  description: "一个个人文档网站",
  base: '/', 
  
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],

  // i18n
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '我的知识库',
      description: '一个个人文档网站',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'My Knowledge Base',
      description: 'A personal documentation website',
    }
  },

  themeConfig: {
    nav,
    sidebar,
    
    // Social media links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-github-username' }
    ],

    // Homepage example
    // To use this, you need to create a `docs/index.md` file with `home: true` in the frontmatter.
    // ---
    // home: true
    // heroImage: /logo.svg
    // heroText: 我的知识库
    // tagline: 一个 VitePress 驱动的文档网站
    // actions:
    //   - theme: brand
    //     text: 开始阅读
    //     link: /笔记/
    //   - theme: alt
    //     text: 在 GitHub 上查看
    //     link: https://github.com/your-github-username
    // features:
    //   - title: 笔记
    //     details: 记录学习过程中的笔记。
    //   - title: 分享
    //     details: 分享一些有用的技术和工具。
    //   - title: 归档
    //     details: 归档一些旧的但有价值的文章。
    // ---
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Your Name'
    },
    
    // search: {
    //   provider: 'local'
    // },
    
    editLink: {
      pattern: 'https://github.com/your-github-username/your-repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    }
  }
})
```

#### `docs/index.md` 示例

为了配置主页，你需要在 `docs` 目录下创建 `index.md` 文件，并使用 Frontmatter 来定义主页布局，例如：

```markdown
---
home: true
heroImage: /logo.svg
heroText: 我的知识库
tagline: 一个 VitePress 驱动的文档网站
actions:
  - theme: brand
    text: 开始阅读
    link: /Linux/Zsh 全局配置
  - theme: alt
    text: 在 GitHub 上查看
    link: https://github.com/tiamat-xu
features:
  - title: 笔记
    details: 记录学习过程中的笔记。
  - title: 分享
    details: 分享一些有用的技术和工具。
  - title: 归档
    details: 归档一些旧的但有价值的文章。
---
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

C