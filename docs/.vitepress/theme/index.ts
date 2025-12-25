import { readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const docsDir = resolve(__dirname, '../../')

// Helper function to generate sidebar items from a directory
function getSidebarItems(dir, baseLink) {
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
  const sidebar = {}
  const topLevelDirs = readdirSync(docsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== '.vitepress' && dirent.name !== 'public')
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
    .filter(dirent => dirent.isDirectory() && dirent.name !== '.vitepress' && dirent.name !== 'public')
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

export const sidebar = generateSidebar()
export const nav = generateNav()