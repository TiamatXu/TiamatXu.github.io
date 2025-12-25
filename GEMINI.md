# Project Overview

This repository is a personal knowledge base and documentation website built with [VitePress](https://vitepress.dev/). The content is written in Markdown and organized into different sections, primarily focusing on technical notes related to Linux and web development. The site is configured in Chinese.

The project uses [Obsidian](https://obsidian.md/) for local note-taking, as indicated by the `.obsidian` directory. The final output is a static website that can be deployed to any web server.

## Key Directories and Files

-   `docs/`: This directory contains all the Markdown content and VitePress-specific configuration.
    -   `.vitepress/config.ts`: The main configuration file for the VitePress site. It defines the site's title, description, navigation, and sidebar structure.
    -   `Linux/`: Contains technical notes related to the Linux operating system.
    -   `文档型网站/`: Contains notes related to building documentation websites.
-   `.github/workflows/deploy.yml`: This file likely contains the CI/CD pipeline for automatically deploying the VitePress site, probably to GitHub Pages.
-   `package.json`: Defines the project's dependencies and scripts for running the development server, building the site, and previewing the build.
-   `.obsidian/`: This directory contains configuration files for the Obsidian note-taking app, suggesting that the author uses Obsidian to manage the documentation.

## Building and Running

To work with this project, you need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (or another package manager like npm or yarn) installed.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Run the development server:**
    This command starts a local server that automatically reloads when you make changes to the source files.
    ```bash
    pnpm docs:dev
    ```

3.  **Build the static site:**
    This command generates the static HTML, CSS, and JavaScript files for the website. The output will be in the `docs/.vitepress/dist` directory.
    ```bash
    pnpm docs:build
    ```

4.  **Preview the built site:**
    This command starts a local server to preview the built site.
    ```bash
    pnpm docs:preview
    ```

## Development Conventions

-   **Content:** All content is written in Markdown and located in the `docs` directory.
-   **Configuration:** The site's structure and appearance are configured in `docs/.vitepress/config.ts`.
-   **Dependencies:** Project dependencies are managed with pnpm.
-   **Deployment:** The site is automatically deployed using the GitHub Actions workflow in `.github/workflows/deploy.yml`.
