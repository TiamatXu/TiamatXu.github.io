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