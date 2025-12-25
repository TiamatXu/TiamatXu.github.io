> 经过一番探索和尝试，我最终决定采用一个最直接、最安全的方法来部署我的公开文档网站。
>
> 这个方法的核心，是**将所有与网站相关的文件都放在我的 `TiamatXu/TiamatXu.github.io` 这个公开仓库中**，并在这个仓库内完成所有的构建和发布工作。
>
> 这样就与我的私有日记仓库完全分离开来，确保了隐私的绝对安全。以下是我的完整操作步骤。

---

### 第 1 步：准备项目文件

我做的第一件事，就是将之前用于构建网站的 `docs` 目录，完整地移动到了 `TiamatXu.github.io` 这个仓库的根目录下。

同时，我确保了 `docs` 目录中只包含我希望公开发布的 `笔记` 内容。

最终，我的公开仓库 `TiamatXu.github.io` 中的项目结构如下：

```
TiamatXu.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml  (将在后面创建)
├── docs/
│   ├── .vitepress/
│   │   └── config.ts
│   ├── tsconfig.json
│   └── 笔记/
│       └── ...
└── package.json
```

### 第 2 步：配置项目依赖和脚本

接下来，我为这个项目配置了运行环境。

#### `package.json`
我在仓库的**根目录**下创建了 `package.json` 文件，用来管理所有必需的依赖包和运行脚本。

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

#### `tsconfig.json`
为了让 VitePress 正确处理 TypeScript 文件，我在 `docs` 目录内创建了 `tsconfig.json`。

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

#### `config.ts`
最后，我修改了 `docs/.vitepress/config.ts` 文件，让网站的导航和侧边栏只显示我的 `笔记` 内容。

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

### 第 3 步：设置自动化工作流

这是实现自动部署最关键的一步。我在 `.github/workflows/` 目录下创建了 `deploy.yml` 文件。

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

### 第 4 步：配置 GitHub Pages

最后一步是在 `TiamatXu.github.io` 仓库的设置中，告诉 GitHub Pages 使用我刚刚创建的 Actions 来部署网站。

1.  我进入仓库的 `Settings` -> `Pages`。
2.  在 `Build and deployment` -> `Source` 选项中，我选择了 **`GitHub Actions`**。

### 总结

做完以上所有步骤后，整个流程就变得非常简单和自动化了：
1.  我在本地 `docs/笔记` 目录下修改或添加文档。
2.  我将代码 `push` 到 `TiamatXu.github.io` 仓库的 `main` 分支。
3.  GitHub Actions 会自动接管一切，完成网站的构建和发布。

这个方案让我可以安心地只维护一个公开的文档仓库，而我所有的私密日记都安全地存放在另一个完全独立的私有仓库中。
