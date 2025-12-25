# 项目概述

这个仓库是一个个人知识库和文档网站，使用 [VitePress](https://vitepress.dev/) 构建。内容以Markdown编写，并组织成不同的部分，主要关注与Linux和Web开发相关的技术笔记。该站点配置为中文。

该项目使用 [Obsidian](https://obsidian.md/) 进行本地笔记记录，如 `.obsidian` 目录所示。最终输出是一个静态网站，可以部署到任何Web服务器。

## 关键目录和文件

-   `docs/`：此目录包含所有Markdown内容和VitePress特定配置。
    -   `.vitepress/config.ts`：VitePress站点的配置文件。它定义了站点的标题、描述、导航和侧边栏结构。
    -   `Linux/`：包含与Linux操作系统相关的技术笔记。
    -   `文档型网站/`：包含与构建文档网站相关的笔记。
-   `.github/workflows/deploy.yml`：此文件可能包含CI/CD管道，用于自动部署VitePress站点，可能部署到GitHub Pages。
-   `package.json`：定义项目的依赖项和脚本，用于运行开发服务器、构建站点和预览构建。
-   `.obsidian/`：此目录包含Obsidian笔记应用程序的配置文件，表明作者使用Obsidian来管理文档。

## 构建和运行

要使用此项目，您需要安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)（或其他包管理器，如npm或yarn）。

1.  **安装依赖项：**
    ```bash
    pnpm install
    ```

2.  **运行开发服务器：**
    此命令启动一个本地服务器，当您对源文件进行更改时会自动重新加载。
    ```bash
    pnpm docs:dev
    ```

3.  **构建静态站点：**
    此命令生成网站的静态HTML、CSS和JavaScript文件。输出将在 `docs/.vitepress/dist` 目录中。
    ```bash
    pnpm docs:build
    ```

4.  **预览构建的站点：**
    此命令启动一个本地服务器来预览构建的站点。
    ```bash
    pnpm docs:preview
    ```

## 开发约定

-   **内容：** 所有内容以Markdown编写，并位于 `docs` 目录中。
-   **配置：** 站点的结构和外观在 `docs/.vitepress/config.ts` 中配置。
-   **依赖项：** 项目依赖项使用pnpm管理。
-   **部署：** 站点使用 `.github/workflows/deploy.yml` 中的GitHub Actions工作流自动部署。
