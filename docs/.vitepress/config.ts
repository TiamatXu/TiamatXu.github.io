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
    
    search: {
      provider: 'local'
    },
    
    editLink: {
      pattern: 'https://github.com/your-github-username/your-repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    }
  }
})