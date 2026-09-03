import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
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
  watch: ['../../../docs/bash-builder/commands/**/*.ts'],
  async load(): Promise<BashDataGroup[]> {
    const commandsDir = path.resolve(__dirname, '../../../docs/bash-builder/commands')
    if (!fs.existsSync(commandsDir)) return []

    const groups: Record<string, CommandData[]> = {}

    // 递归读取目录，每个分类目录下每个命令为独立的 .ts 模块（默认导出 CommandData）
    const categories = fs.readdirSync(commandsDir)
    for (const catEn of categories) {
      const catPath = path.join(commandsDir, catEn)
      if (!fs.statSync(catPath).isDirectory()) continue

      const files = fs.readdirSync(catPath).filter(f => f.endsWith('.ts'))
      for (const file of files) {
        const filePath = path.join(catPath, file)
        const mod = await import(pathToFileURL(filePath).href)
        const cmd = mod.default as CommandData

        if (!groups[catEn]) groups[catEn] = []
        groups[catEn].push(cmd)
      }
    }

    return Object.keys(groups).sort().map(catEn => ({
      categoryEn: catEn,
      category: CATEGORY_MAP[catEn] || catEn, // 如果没映射则显示原名
      commands: groups[catEn].sort((a, b) => a.name.localeCompare(b.name))
    }))
  }
}
