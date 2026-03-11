import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import type { CommandData } from './types'

export interface BashDataGroup {
  category: string
  categoryEn: string
  commands: CommandData[]
}

// 分类名称映射表
const CATEGORY_MAP: Record<string, string> = {
  'filesystem': '文件系统',
  'text-processing': '文本处理',
  'network': '网络工具',
  'system-info': '系统信息',
  'package-management': '包管理',
  'archive': '压缩归档',
  'process': '进程管理',
  'other': '其他工具'
}

export default {
  watch: ['../../../docs/bash-builder/commands/**/*.yaml'],
  load(): BashDataGroup[] {
    const commandsDir = path.resolve(__dirname, '../../../docs/bash-builder/commands')
    if (!fs.existsSync(commandsDir)) return []

    const groups: Record<string, CommandData[]> = {}

    // 递归读取目录
    const categories = fs.readdirSync(commandsDir)
    categories.forEach(catEn => {
      const catPath = path.join(commandsDir, catEn)
      if (fs.statSync(catPath).isDirectory()) {
        const files = fs.readdirSync(catPath).filter(f => f.endsWith('.yaml'))
        files.forEach(file => {
          const filePath = path.join(catPath, file)
          const content = fs.readFileSync(filePath, 'utf-8')
          const cmd = yaml.load(content) as CommandData
          
          if (!groups[catEn]) groups[catEn] = []
          groups[catEn].push(cmd)
        })
      }
    })

    return Object.keys(groups).sort().map(catEn => ({
      categoryEn: catEn,
      category: CATEGORY_MAP[catEn] || catEn, // 如果没映射则显示原名
      commands: groups[catEn].sort((a, b) => a.name.localeCompare(b.name))
    }))
  }
}
