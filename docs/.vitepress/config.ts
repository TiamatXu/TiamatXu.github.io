import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "TiamatXu 的个人知识库",
    description: "一个安全的个人文档网站。",
    base: '/', // 部署在根域名 TiamatXu.github.io

    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '笔记', link: '/笔记/Linux/全局配置 ZSH & OhMyZsh' },
            { text: '日记', link: '/日记/202512.md' },
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
            ],
            '/日记/': [
                {
                    text: '日记',
                    items: [
                        { text: '2025年12月', link: '/日记/202512.md' },
                    ]
                }
            ]
        },
    }
})