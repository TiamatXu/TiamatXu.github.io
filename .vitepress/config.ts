import { defineConfigWithTheme } from 'vitepress'
import path from 'path'
import baseConfig from '../src/vitepress/config/baseConfig'
import type { Config as ThemeConfig } from '../src/vitepress/config'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  vite: {
    build: {
      minify: false
    },
    resolve: {
      alias: {
        '@vue/theme': path.join(__dirname, '../src')
      }
    }
  },

  lang: 'zh-CN',
  title: 'TiamatXu',
  srcDir: 'docs',
  description: 'TiamatXu 的文档库，分享技术文章和个人见解。',

  head: [
    ['meta', { property: 'og:url', content: 'https://tiamatxu.github.io' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'TiamatXu' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'TiamatXu 的文档库，分享技术文章和个人见解。'
      }
    ],
    ['meta', { property: 'og:image', content: '/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://tiamatxu.github.io' }]
  ],

  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/TiamatXu' }],

    nav: [
      {
        text: '文档',
        activeMatch: `^/(Linux|文档|TODO)/`,
        items: [
          { text: 'Linux', link: '/linux/zookeeper-docker-arrangement' },
          { text: '文档', link: '/doc-site/vitepress-deployment-guide' },
          { text: 'TODO', link: '/todo/todolists' }
        ]
      },
      {
        text: '项目',
        activeMatch: `^/project/`,
        items: [
          {
            text: 'Github',
            items: [
              { text: 'Github 主页', link: 'https://github.com/TiamatXu' }
            ]
          },
          {
            text: '开发项目',
            items: [
              {
                text: 'ZooKeeper',
                link: 'https://www.google.com/search?q=Zookeeper'
              },
              { text: 'Redis', link: 'https://www.baidu.com/s?wd=redis' },
              { text: 'Kafka', link: 'https://www.baidu.com/s?wd=Kafka' }
            ]
          }
        ]
      }
    ],

    sidebar: {
      '/doc-site/': [
        {
          text: '文档型网站',
          items: [
            { text: 'VitePress 部署指南', link: '/doc-site/vitepress-deployment-guide' }
          ]
        }
      ],
      '/linux/': [
        {
          text: '环境搭建',
          items: [
            { text: 'Docker-Zookeeper 集群编排', link: '/linux/zookeeper-docker-arrangement' }
          ]
        },
        {
          text: '系统开荒',
          items: [
            { text: 'Zsh 全局配置', link: '/linux/global-zsh-configuration' }
          ]
        }
      ],
      '/todo/': [
        {
          text: '待办清单',
          items: [
            { text: '待办清单', link: '/todo/todolists' },
            { text: '开发计划', link: '/todo/dev-plan' }
          ]
        }
      ]
    },

    i18n: {
      search: '搜索',
      menu: '菜单',
      toc: '本页目录',
      returnToTop: '返回顶部',
      appearance: '外观',
      previous: '前一篇',
      next: '下一篇',
      pageNotFound: '页面未找到',
      deadLink: { before: '你打开了一个不存在的链接：', after: '。' },
      deadLinkReport: {
        before: '不介意的话请提交到',
        link: '这里',
        after: '，我们会跟进修复。'
      },
      footerLicense: { before: '', after: '' },
      ariaAnnouncer: { before: '', after: '已经加载完毕' },
      ariaDarkMode: '切换深色模式',
      ariaSkipToContent: '直接跳到内容',
      ariaToC: '当前页面的目录',
      ariaMainNav: '主导航',
      ariaMobileNav: '移动版导航',
      ariaSidebarNav: '侧边栏导航'
    },

    localeLinks: [
      {
        link: 'https://tiamatxu.github.io',
        text: '简体中文',
        repo: 'https://github.com/TiamatXu/TiamatXu.github.io'
      },
      {
        link: '',
        text: '暂无其他语言!',
        isTranslationsDesc: true
      }
    ],

    editLink: {
      repo: 'TiamatXu/TiamatXu.github.io#master',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      license: {
        text: '版权声明',
        link: 'https://github.com/TiamatXu/TiamatXu.github.io#许可证'
      },
      copyright: '本个人博客采用 MIT License 进行许可。'
    }
  }
})
