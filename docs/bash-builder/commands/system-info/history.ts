import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'history',
  desc: '显示 shell 命令历史记录',
  category: 'system-info',
  options: [
    {
      flag: '-c',
      type: 'boolean',
      desc: '清空当前历史记录',
      long: '--clear'
    },
    {
      flag: '-d',
      type: 'string',
      desc: '删除指定编号的历史记录',
      long: '--delete'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'history 是 shell（bash/zsh）内建命令，行为跟随所用 shell 而非操作系统；macOS 自 Catalina 起默认 shell 为 zsh，Linux 发行版通常默认 bash，两者的 history 内建实现细节略有差异，但基础用法一致。',
      source: 'BSD'
    }
  }
}

export default data
