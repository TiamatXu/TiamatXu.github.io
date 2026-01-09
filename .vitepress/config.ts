import {defineConfigWithTheme} from 'vitepress'
import path from 'path'
import baseConfig from '../src/vitepress/config/baseConfig'
import type {Config as ThemeConfig} from '../src/vitepress/config'


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
  description: 'TiamatXu 的个人博客，分享技术文章和个人见解。',

  themeConfig: {
    // algolia: {
    //   indexName: 'vuejs-v3',
    //   appId: 'BH4D9OD16A',
    //   apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f',
    //   placeholder: 'Search on Vue theme',
    //   translations: {
    //     modal: {
    //       searchBox: {
    //         cancelButtonText: 'Abort',
    //         resetButtonTitle: 'Clear search term'
    //       },
    //       footer: {
    //         searchByText: 'Search gracefully done by '
    //       }
    //     }
    //   }
    // },
    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      {icon: 'github', link: 'https://github.com/TiamatXu'},
      // { icon: 'x', link: 'https://twitter.com/vuejs' },
      // { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    nav: [
      {
        text: '文档',
        // activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
        items: [
          {text: 'Linux', link: '/linux/Docker-zookeeper 集群编排'},
          {text: '文档', link: '/doc-site/VitePress 部署指南'},
          {text: '深度指南', link: '/guide/introduction'},
        ]
      },
      // {
      //   text: 'docs',
      //   activeMatch: `^/(guide|examples)/`,
      //   items: [
      //     {
      //       items: [
      //         {text: 'Guide', link: '/guide/introduction'},
      //         {text: 'Installation', link: '/guide/installation'}
      //       ]
      //     }
      //   ]
      // },
      // {
      //   text: 'API Reference',
      //   activeMatch: `^/api/`,
      //   link: '/api/'
      // },
      {
        text: '项目',
        items: [
          {
            items: [{text: 'Github 主页', link: 'https://github.com/TiamatXu'}]
          },
          {
            text: '开发项目',
            items: [
              {text: 'ZooKeeper', link: 'https://www.google.com/search?q=Zookeeper'},
              {text: 'Redis', link: 'https://www.baidu.com/s?wd=redis'},
              {text: 'Kafka', link: 'https://www.baidu.com/s?wd=Kafka'},
            ]
          }
        ]
      },
    ],

    sidebar: {
      '/doc-site/': [
        {
          text: '文档型网站',
          items: [
            {
              text: 'VitePress 部署指南',
              link: '/doc-site/VitePress 部署指南'
            },
          ]
        },
      ],
      '/linux/': [
        {
          text: '环境搭建',
          items: [
            {
              text: 'Docker-zookeeper 集群编排',
              link: '/linux/Docker-zookeeper 集群编排'
            },
          ]
        },
        {
          text: '系统开荒',
          items: [
            {
              text: 'Zsh 全局配置',
              link: '/linux/Zsh 全局配置'
            },
          ]
        },
      ],
      '/guide/': [
        {
          text: 'Essentials',
          items: [
            {text: 'Introduction', link: '/guide/introduction'},
            {text: 'Installation', link: '/guide/installation'},
            {
              text: 'Application & Component Instances',
              link: '/guide/instance'
            },
            {text: 'Template Syntax', link: '/guide/template-syntax'},
            {
              text: 'Data Properties and Methods',
              link: '/guide/data-methods'
            },
            {
              text: 'Computed Properties and Watchers',
              link: '/guide/computed'
            },
            {
              text: 'Class and Style Bindings',
              link: '/guide/class-and-style'
            },
            {text: 'Conditional Rendering', link: '/guide/conditional'},
            {text: 'List Rendering', link: '/guide/list'},
            {text: 'Event Handling', link: '/guide/events'},
            {text: 'Form Input Bindings', link: '/guide/forms'},
            {text: 'Components Basics', link: '/guide/component-basics'}
          ]
        },
        {
          text: 'Components In-Depth',
          items: [
            {
              text: 'Component Registration',
              link: '/guide/component-registration'
            },
            {text: 'Props', link: '/guide/component-props'},
            {text: 'Non-Prop Attributes', link: '/guide/component-attrs'},
            {text: 'Custom Events', link: '/guide/component-custom-events'},
            {text: 'Slots', link: '/guide/component-slots'},
            {
              text: 'Provide / inject',
              link: '/guide/component-provide-inject'
            },
            {
              text: 'Dynamic & Async Components',
              link: '/guide/component-dynamic-async'
            },
            {text: 'Template refs', link: '/guide/component-template-refs'},
            {
              text: 'Handling Edge Cases',
              link: '/guide/component-edge-cases'
            }
          ]
        },
        {
          text: 'Transitions & Animation',
          items: [
            {text: 'Overview', link: '/guide/transitions-overview'},
            {
              text: 'Enter & Leave Transitions',
              link: '/guide/transitions-enterleave'
            },
            {text: 'List Transitions', link: '/guide/transitions-list'},
            {text: 'State Transitions', link: '/guide/transitions-state'}
          ]
        },
        {
          text: 'Reusability',
          items: [
            {text: 'Mixins', link: '/guide/mixins'},
            {text: 'Custom Directives', link: '/guide/custom-directive'}
          ]
        },
        {
          text: 'Composition API',
          items: [
            {
              text: 'Introduction',
              link: '/guide/composition-api-introduction'
            },
            {text: 'Setup', link: '/guide/composition-api-setup'},
            {
              text: 'Lifecycle Hooks',
              link: '/guide/composition-api-lifecycle-hooks'
            },
            {
              text: 'Provide / Inject',
              link: '/guide/composition-api-provide-inject'
            },
            {
              text: 'Template Refs',
              link: '/guide/composition-api-template-refs'
            }
          ]
        },
        {
          text: 'Advanced',
          items: [
            {text: 'Teleport', link: '/guide/teleport'},
            {text: 'Render Function', link: '/guide/render-function'},
            {text: 'Plugins', link: '/guide/plugins'}
          ]
        },
        {
          text: 'Digging Deeper',
          items: [
            {text: 'Reactivity in Depth', link: '/guide/reactivity'},
            {
              text: 'Reactivity Fundamentals',
              link: '/guide/reactivity-fundamentals'
            },
            {
              text: 'Reactivity in Computed and Watch',
              link: '/guide/reactivity-computed-watchers'
            },
            {
              text: 'Rendering Mechanisms and Optimizations',
              link: '/guide/optimizations'
            }
          ]
        },
        {
          text: 'Tooling',
          items: [
            {
              text: 'Single File Components',
              link: '/guide/single-file-component'
            },
            {text: 'Testing', link: '/guide/testing'},
            {text: 'TypeScript Support', link: '/guide/typescript-support'},
            {text: 'Mobile', link: '/guide/mobile'},
            {
              text: 'Production Deployment',
              link: '/guide/tooling/deployment'
            }
          ]
        },
        {
          text: 'Scaling Up',
          items: [
            {text: 'Routing', link: '/guide/routing'},
            {text: 'State Management', link: '/guide/state-management'},
            {text: 'Server-Side Rendering', link: '/guide/ssr'}
          ]
        },
        {
          text: 'Accessibility',
          items: [
            {text: 'Basics', link: '/guide/a11y-basics'},
            {text: 'Semantics', link: '/guide/a11y-semantics'},
            {text: 'Standards', link: '/guide/a11y-standards'},
            {text: 'Resources', link: '/guide/a11y-resources'}
          ]
        }
      ],
      '/api/': [
        {
          text: 'Global API',
          items: [
            {text: 'Application', link: '/api/application'},
            {text: 'Utilities', link: '/api/utilities'}
          ]
        },
        {
          text: 'Component',
          items: [
            {text: 'Options: State', link: '/api/options-state'},
            {text: 'Options: Rendering', link: '/api/options-rendering'},
            {
              text: 'Options: Lifecycle Hooks',
              link: '/api/options-lifecycle'
            },
            {
              text: 'Options: Composition',
              link: '/api/options-composition'
            },
            {text: 'Options: Misc', link: '/api/options-misc'},
            {
              text: 'Instance',
              link: '/api/component-instance'
            }
          ]
        },
        {
          text: 'Composition API',
          items: [
            {text: 'setup()', link: '/api/composition-setup'},
            {text: 'Reactivity', link: '/api/composition-reactivity'},
            {text: 'Lifecycle', link: '/api/composition-lifecycle'}
          ]
        },
        {
          text: 'Built-ins',
          items: [
            {text: 'Directives', link: '/api/built-in-directives'},
            {text: 'Components', link: '/api/built-in-components'},
            {text: 'Special Attributes', link: '/api/special-attributes'}
          ]
        },
        {
          text: 'Single File Component',
          items: [
            {text: 'Specification', link: '/api/sfc-spec'},
            {text: '<script setup>', link: '/api/sfc-script-setup'},
            {text: '<style> Features', link: '/api/sfc-style'}
          ]
        },
        {
          text: 'TypeScript',
          items: [{text: 'Utility Types', link: '/api/types-utility'}]
        },
        {
          text: 'Advanced',
          items: [
            {text: 'Render Function Helpers', link: '/api/render-function'},
            {text: 'Compiler Transforms', link: '/api/compiler'},
            {text: 'Server-Side Rendering', link: '/api/ssr'},
            {text: 'Custom Renderer', link: '/api/custom-renderer'}
          ]
        }
      ]
    },

    // For i18n translation messages
    i18n: {
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
    },

    // For locale links
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
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      license: {
        text: '版权声明',
        link: 'https://github.com/TiamatXu/TiamatXu.github.io#许可证'
      },
      copyright:
        '本个人博客采用 MIT License 进行许可。'
    }
  }
})
