import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'top',
  desc: '实时动态显示系统进程与资源占用',
  category: 'process',
  options: [
    {
      flag: '-o',
      type: 'string',
      desc: '指定排序字段'
    },
    {
      flag: '-l',
      type: 'string',
      desc: '刷新的采样次数（0 表示无限，macOS 特有）'
    },
    {
      flag: '-n',
      type: 'string',
      desc: '刷新的采样次数（Linux GNU top）'
    },
    {
      flag: '-b',
      type: 'boolean',
      desc: '批处理模式，适合重定向到文件（非交互）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-o', '-l'],
      note: 'macOS 自带 BSD top 与 Linux 上的 procps top 差异较大：排序字段名（-o 后接的关键字）不同，且没有 -b（批处理/非交互模式）选项；-n 在两者上含义也不同（macOS 上 -n 用于限制显示的进程数，而非采样次数）。',
      source: 'BSD'
    }
  }
}

export default data
