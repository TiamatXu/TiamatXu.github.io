import path from 'path'
import {
  defineConfigWithTheme,
  type Plugin
} from 'vitepress'
import type { Config as ThemeConfig } from '../vuetheme/vitepress/config'
import baseConfig from '../vuetheme/vitepress/config/baseConfig'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from 'vitepress-plugin-group-icons'

const nav: ThemeConfig['nav'] = [
  {
    text: 'BashBuilder',
    activeMatch: `^/(bash-builder)/`,
    link: '/bash-builder/'
  },
  {
    text: '文档',
    activeMatch: `^/(knowledge|linux|doc-site|todo|showcase)/`,
    items: [
      { text: '八股文', link: '/knowledge/introduction' },
      { text: 'Linux', link: '/linux/zookeeper-docker-arrangement' },
      { text: '文档', link: '/doc-site/vitepress-deployment-guide' },
      { text: 'TODO', link: '/todo/todolists' },
      { text: 'Showcase', link: '/showcase/icons' }
    ]
  },
  {
    text: 'AI 领域',
    activeMatch: `^/(AI)/`,
    items: [
      { text: 'RAG', link: '/AI/RAG/index' },
      { text: '大模型', link: '/AI/large-model/index' }
    ]
  },
  {
    text: '项目',
    activeMatch: `^/project/`,
    items: [
      {
        text: 'Github',
        items: [{ text: 'Github 主页', link: 'https://github.com/TiamatXu' }]
      },
      {
        text: '开发项目',
        items: [
          { text: 'ZooKeeper', link: 'https://www.google.com/search?q=Zookeeper' },
          { text: 'Redis', link: 'https://www.baidu.com/s?wd=redis' },
          { text: 'Kafka', link: 'https://www.baidu.com/s?wd=Kafka' }
        ]
      },
      {
        text: 'Other',
        items: [{ text: 'Github 热力图组件', link: '/project/contribution-graph' }]
      }
    ]
  },
  {
    text: '关于',
    activeMatch: `^/about/`,
    items: [
      { text: '关于本站', link: '/about/website' },
      { text: '关于作者', link: '/about/author' }
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/knowledge/': [
    {
      text: '== 八股文 ==',
      items: [
        { text: '介绍', link: '/knowledge/introduction' },
        { text: '笔试指南', link: '/knowledge/exam-tutorial' }
      ]
    },
    {
      text: 'Java',
      items: [
        { text: 'Java SE', link: '/knowledge/java/basic' },
        { text: '并发编程', link: '/knowledge/java/concurrent' },
        { text: 'JVM 虚拟机', link: '/knowledge/java/jvm' },
        { text: 'MQ 消息队列', link: '/knowledge/java/msg-queue' },
        { text: 'Spring 框架', link: '/knowledge/java/spring' },
        { text: '分布式缓存', link: '/knowledge/java/distributed-cache' },
        { text: '搜索引擎', link: '/knowledge/java/search-engine' },
        { text: '分布式事务', link: '/knowledge/java/distributed-transaction' },
        { text: '微服务 RPC', link: '/knowledge/java/mservie' },
        { text: '系统设计', link: '/knowledge/java/sys-design' },
        { text: '数据库', link: '/knowledge/java/db' },
        { text: '业务稳定性', link: '/knowledge/java/constancy' },
        { text: '海量数据处理', link: '/knowledge/java/large-data' },
        { text: '管理', link: '/knowledge/java/manage' },
        { text: '设计模式', link: '/knowledge/java/design-pattern' },
        { text: '容器 K8S', link: '/knowledge/java/k8s' }
      ]
    }
  ],
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
      text: 'Reference',
      items: [
        { text: '参考', link: 'todo/reference' },
        { text: '待办事项', link: 'todo/todolists' }
      ]
    },
    {
      text: '项目列表',
      items: [
        { text: '任务调度与执行系统', link: 'todo/1-distributed-task-scheduling' },
        { text: '实时数据处理监控平台', link: '/todo/2-real-time-data-processing' },
        { text: '跨语言“推荐 / 排序 / 推送引擎”', link: '/todo/3-cross-language-recommendation-engine' },
        { text: '在线多人对战游戏后端', link: '/todo/4-online-multiplayer-game-backend' },
        { text: '跨语言“数据管道 + 任务中心”', link: '/todo/5-cross-language-data-pipeline-task-center' }
      ]
    }
  ]
}

const i18n: ThemeConfig['i18n'] = {
  search: '搜索',
  menu: '菜单',
  toc: '本页目录',
  returnToTop: '返回顶部',
  appearance: '外观',
  previous: '上一篇',
  next: '下一篇',
  pageNotFound: '页面未找到',
  deadLink: { before: '你打开了一个不存在的链接：', after: '。' },
  deadLinkReport: { before: '不介意的话请提交到', link: '这里', after: '，我会跟进修复。' },
  footerLicense: { before: '', after: '' },
  ariaAnnouncer: { before: '', after: '已经加载完毕' },
  ariaDarkMode: '切换深色模式',
  ariaSkipToContent: '直接跳到内容',
  ariaToC: '当前页面的目录',
  ariaMainNav: '主导航',
  ariaMobileNav: '移动版导航',
  ariaSidebarNav: '侧边栏导航'
}

// function inlineScript(file: string): HeadConfig {
//   return [
//     'script',
//     {},
//     fs.readFileSync(
//       path.resolve(__dirname, `./inlined-scripts/${file}`),
//       'utf-8'
//     )
//   ]
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://tiamatxu.github.io'
  },

  lang: 'zh-CN',
  title: 'TiamatXu',
  description: 'TiamatXu 的个人网站，分享技术文章和个人见解。',
  srcDir: 'docs',
  srcExclude: ['api/**'],

  head: [
    ['meta', { name: 'theme-color', content: '' }],
    ['meta', { property: 'og:url', content: 'https://tiamatxu.github.io' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'TiamatXu' }],
    ['meta', { property: 'og:description', content: 'TiamatXu 的个人网站，分享技术文章和个人见解。' }],
    ['meta', { property: 'og:image', content: 'https://tiamatxu.github.io/logo.png' }],
    // ['meta', { name: 'twitter:site', content: '@vuejs' }],
    // ['meta', { name: 'twitter:card', content: 'summary' }],
    ['link', { rel: 'preconnect', href: 'https://tiamatxu.github.io' }]
    // inlineScript('restorePreference.js'),
    // inlineScript('uwu.js'),
    // ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'ZPMMDSYA', 'data-spa': 'auto', defer: '' }],
    // ['script', { src: 'https://media.bitterbrains.com/main.js?from=vuejs&type=top', async: 'true' }]
  ],

  themeConfig: {
    nav,
    sidebar,
    i18n,

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TiamatXu' }
    ],

    editLink: { repo: 'TiamatXu/TiamatXu.github.io#master', text: '在 GitHub 上编辑此页' },

    footer: {
      license: { text: '版权声明', link: 'https://github.com/TiamatXu/TiamatXu.github.io#许可证' },
      copyright: '本个人网站采用 MIT License 进行许可。'
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin).use(groupIconMdPlugin)
    }
  },

  vite: {
    resolve: {
      alias: {
        '@vuetheme': path.join(__dirname, '../vuetheme'),
        '@theme': path.join(__dirname, './theme')
      }
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    },
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          cypress: 'vscode-icons:file-type-cypress',
          'testing library': 'logos:testing-library'
        }
      }) as Plugin
    ]
  }
})
