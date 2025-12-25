import { defineConfig } from 'vitepress'
import { readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

// Get the current directory
const __dirname = resolve()
const docsDir = resolve(__dirname, 'docs')

// Helper function to generate sidebar items from a directory
function getSidebarItems(dir: string, baseLink: string) {
  return readdirSync(dir)
    .filter(file => file.endsWith('.md') || statSync(join(dir, file)).isDirectory())
    .map(file => {
      const filePath = join(dir, file)
      const fileStat = statSync(filePath)
      if (fileStat.isDirectory()) {
        return {
          text: file,
          items: getSidebarItems(filePath, `${baseLink}/${file}`),
          collapsible: true,
        }
      }
      const text = file.replace('.md', '')
      const link = `${baseLink}/${text}`
      return { text, link }
    })
}

// Generate the sidebar object
function generateSidebar() {
  const sidebar: Record<string, any> = {}
  const topLevelDirs = readdirSync(docsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== '.vitepress' && dirent.name !== 'public' && dirent.name !== 'ecosystem' && dirent.name !== 'team')
    .map(dirent => dirent.name)

  topLevelDirs.forEach(dir => {
    const dirPath = join(docsDir, dir)
    sidebar[`/${dir}/`] = [
      {
        text: dir,
        items: getSidebarItems(dirPath, `/${dir}`),
        collapsible: true,
      },
    ]
  })
  return sidebar
}

// Generate the navigation bar items
function generateNav() {
  const topLevelDirs = readdirSync(docsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== '.vitepress' && dirent.name !== 'public' && dirent.name !== 'ecosystem' && dirent.name !== 'team')
    .map(dirent => dirent.name)

  const docsNav = {
    text: '文档',
    items: topLevelDirs.map(dir => {
      const dirPath = join(docsDir, dir)
      // Find the first markdown file to link to
      const firstFile = readdirSync(dirPath).find(file => file.endsWith('.md'))
      const link = firstFile ? `/${dir}/${firstFile.replace('.md', '')}` : `/${dir}/`
      return { text: dir, link }
    })
  }

  return [
    { text: '首页', link: '/' },
    docsNav,
    {
      text: '生态系统',
      items: [
        { text: '资源', link: '/ecosystem/resources' },
        { text: '社区', link: '/ecosystem/community' },
        { text: '贡献', link: '/ecosystem/contributing' },
      ],
    },
    { text: '团队', link: '/team' },
  ]
}

export default defineConfig(async () => {
  return {
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
      nav: generateNav(),
      sidebar: generateSidebar(),
    
      // Social media links
      socialLinks: [
        { icon: 'github', link: 'https://github.com/TiamatXu' }
      ],
      
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present Your Name'
      },
      
      // search: {
      //   provider: 'local'
      // },
      
      editLink: {
        pattern: 'https://github.com/TiamatXu/TiamatXu.github.io/edit/main/docs/:path',
        text: '在 GitHub 上编辑此页面'
      }
    }
  }
})