import path from 'path'
import { defineConfigWithTheme, type Plugin } from 'vitepress'
import type { Config as ThemeConfig } from '../vuetheme/vitepress/config'
import baseConfig from '../vuetheme/vitepress/config/baseConfig'
import { headerPlugin } from './headerMdPlugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { loadYamlConfig } from './theme/utils'

const nav = loadYamlConfig(path.resolve(__dirname, './config/nav.yaml')) as ThemeConfig['nav']
const sidebar = loadYamlConfig(path.resolve(__dirname, './config/sidebar.yaml')) as ThemeConfig['sidebar']
const i18n = loadYamlConfig(path.resolve(__dirname, './config/i18n.yaml')) as ThemeConfig['i18n']

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://tiamatxu.github.io'
  },

  lang: 'zh-CN',
  title: 'TiamatXu',
  description: 'TiamatXu 的个人网站，分享技术文章和个人见解。',
  srcDir: 'docs',
  // srcExclude: ['api/**'],

  head: [
    ['meta', { name: 'theme-color', content: '' }],
    ['meta', { property: 'og:url', content: 'https://tiamatxu.github.io' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'TiamatXu' }],
    ['meta', { property: 'og:description', content: 'TiamatXu 的个人网站，分享技术文章和个人见解。' }],
    ['meta', { property: 'og:image', content: 'https://tiamatxu.github.io/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://tiamatxu.github.io' }]
  ],

  themeConfig: {
    nav,
    sidebar,
    i18n,

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
