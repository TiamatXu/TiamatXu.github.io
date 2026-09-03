import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'pgrep',
  desc: '按名称/属性匹配并列出进程 PID',
  category: 'process',
  arguments: [
    {
      name: 'pattern',
      type: 'pattern',
      required: true,
      desc: '用于匹配进程名的模式'
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'boolean',
      desc: '匹配完整命令行而非仅进程名',
      long: '--full'
    },
    {
      flag: '-l',
      type: 'boolean',
      desc: '同时显示进程名称',
      long: '--list-name'
    },
    {
      flag: '-u',
      type: 'string',
      desc: '按用户过滤',
      long: '--euid'
    },
    {
      flag: '-x',
      type: 'boolean',
      desc: '要求进程名精确匹配',
      long: '--exact'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'pgrep 在 macOS 上原生自带，常用选项 -f/-l/-u/-x 与 Linux 版本一致。',
      source: 'BSD'
    }
  }
}

export default data
