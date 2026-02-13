import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import type { CommandData } from './types'

export interface BashDataGroup {
  category: string
  commands: CommandData[]
}

// 模拟 Vue 官方 api.data.ts 的加载模式
export default {
  watch: ['../../../docs/bash-builder/commands/*.yaml'],
  load(): BashDataGroup[] {
    const commandsDir = path.resolve(__dirname, '../../../docs/bash-builder/commands')
    
    // 如果目录不存在，返回空
    if (!fs.existsSync(commandsDir)) return []

    const files = fs.readdirSync(commandsDir)
    const allCommands: CommandData[] = files
      .filter(file => file.endsWith('.yaml'))
      .map(file => {
        const filePath = path.join(commandsDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        return yaml.load(content) as CommandData
      })

    // 处理分类逻辑
    const groups: Record<string, CommandData[]> = {}
    allCommands.forEach(cmd => {
      const cat = cmd.category || 'Other'
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(cmd)
    })

    return Object.keys(groups).sort().map(cat => ({
      category: cat,
      commands: groups[cat].sort((a, b) => a.name.localeCompare(b.name))
    }))
  }
}
