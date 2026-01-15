import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme, type HeadConfig, type Plugin } from 'vitepress'
import type { Config as ThemeConfig } from '../src/vitepress'
import llmstxt from 'vitepress-plugin-llms'
import baseConfig from '../src/vitepress/config/baseConfig.js'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from 'vitepress-plugin-group-icons'

const nav: ThemeConfig['nav'] = [
  {
    text: '文档',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Linux', link: '/linux/Docker-zookeeper 集群编排' },
      { text: '文档', link: '/doc-site/VitePress 部署指南' },
      { text: '深度指南', link: '/guide/introduction' }
    ]
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/'
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/doc-site/': [
    {
      text: '文档型网站',
      items: [
        {
          text: 'VitePress 部署指南',
          link: '/doc-site/VitePress 部署指南'
        }
      ]
    }
  ],
  '/linux/': [
    {
      text: '环境搭建',
      items: [
        {
          text: 'Docker-zookeeper 集群编排',
          link: '/linux/Docker-zookeeper 集群编排'
        }
      ]
    },
    {
      text: '系统开荒',
      items: [
        {
          text: 'Zsh 全局配置',
          link: '/linux/Zsh 全局配置'
        }
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
  previous: '前一篇',
  next: '下一篇',
  pageNotFound: '页面未找到',
  deadLink: {
    before: '你打开了一个不存在的链接：',
    after: '。'
  },
  deadLinkReport: {
    before: '不介意的话请提交到',
    link: '这里',
    after: '，我们会跟进修复。'
  },
  footerLicense: {
    before: '',
    after: ''
  },
  ariaAnnouncer: {
    before: '',
    after: '已经加载完毕'
  },
  ariaDarkMode: '切换深色模式',
  ariaSkipToContent: '直接跳到内容',
  ariaToC: '当前页面的目录',
  ariaMainNav: '主导航',
  ariaMobileNav: '移动版导航',
  ariaSidebarNav: '侧边栏导航'
}

function inlineScript(file: string): HeadConfig {
  return [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, `./inlined-scripts/${file}`),
      'utf-8'
    )
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://cn.vuejs.org'
  },

  lang: 'zh-CN',
  title: 'TiamatXu',
  description: 'TiamatXu 的个人博客',
  srcDir: 'docs',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://vuejs.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'TiamatXu' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'TiamatXu 的个人博客'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: '/logo.png'
      }
    ],
    // ['meta', { name: 'twitter:site', content: '@vuejs' }],
    // ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://automation.vuejs.org'
      }
    ],
    inlineScript('restorePreference.js'),
    inlineScript('uwu.js')
    // [
    //   'script',
    //   {
    //     src: 'https://cdn.usefathom.com/script.js',
    //     'data-site': 'ZPMMDSYA',
    //     'data-spa': 'auto',
    //     defer: ''
    //   }
    // ],
    // [
    //   'script',
    //   {
    //     src: 'https://media.bitterbrains.com/main.js?from=vuejs&type=top',
    //     async: 'true'
    //   }
    // ]
  ],

  themeConfig: {
    nav,
    sidebar,
    i18n,

    localeLinks: [
      {
        link: 'https://vuejs.org',
        text: 'English',
        repo: 'https://github.com/vuejs/docs'
      },
      {
        link: '/translations/',
        text: '帮助我们翻译！',
        isTranslationsDesc: true
      }
    ],

    // algolia: {
    //   indexName: 'vuejs_cn2',
    //   appId: 'UURH1MHAF7',
    //   apiKey: 'c23eb8e7895f42daeaf2bf6f63eb4bf6',
    //   searchParameters: {
    //     facetFilters: ['version:v3']
    //   },
    //   placeholder: '搜索文档',
    //   translations: {
    //     button: {
    //       buttonText: '搜索'
    //     },
    //     modal: {
    //       searchBox: {
    //         resetButtonTitle: '清除查询条件',
    //         resetButtonAriaLabel: '清除查询条件',
    //         cancelButtonText: '取消',
    //         cancelButtonAriaLabel: '取消'
    //       },
    //       startScreen: {
    //         recentSearchesTitle: '搜索历史',
    //         noRecentSearchesText: '没有搜索历史',
    //         saveRecentSearchButtonTitle: '保存到搜索历史',
    //         removeRecentSearchButtonTitle: '从搜索历史中移除',
    //         favoriteSearchesTitle: '收藏',
    //         removeFavoriteSearchButtonTitle: '从收藏中移除'
    //       },
    //       errorScreen: {
    //         titleText: '无法获取结果',
    //         helpText: '你可能需要检查你的网络连接'
    //       },
    //       footer: {
    //         selectText: '选择',
    //         navigateText: '切换',
    //         closeText: '关闭',
    //         searchByText: '搜索供应商'
    //       },
    //       noResultsScreen: {
    //         noResultsText: '无法找到相关结果',
    //         suggestedQueryText: '你可以尝试查询',
    //         reportMissingResultsText: '你认为这个查询应该有结果？',
    //         reportMissingResultsLinkText: '向我们反馈'
    //       }
    //     }
    //   }
    // },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/TiamatXu/' }
      // { icon: 'twitter', link: 'https://x.com/vuejs' },
      // { icon: 'discord', link: 'https://discord.com/invite/vue' }
    ],

    editLink: {
      repo: 'vuejs-translations/docs-zh-cn',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      license: {
        text: '版权声明',
        link: 'https://github.com/vuejs-translations/docs-zh-cn#%E7%89%88%E6%9D%83%E5%A3%B0%E6%98%8E'
      },
      copyright: '本个人博客采用 MIT License 进行许可。'
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin).use(groupIconMdPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
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
      llmstxt({
        ignoreFiles: [
          'about/team/**/*',
          'about/team.md',
          'about/privacy.md',
          'about/coc.md',
          'developers/**/*',
          'ecosystem/themes.md',
          'examples/**/*',
          'partners/**/*',
          'sponsor/**/*',
          'index.md'
        ],
        customLLMsTxtTemplate: `\
# saafafrdagrsafgeawe

Vue.js - The Progressive JavaScript Framework

## Table of Contents

{toc}`
      }) as Plugin,
      groupIconVitePlugin({
        customIcon: {
          cypress: 'vscode-icons:file-type-cypress',
          'testing library': 'logos:testing-library'
        }
      }) as Plugin
    ]
  }
})
