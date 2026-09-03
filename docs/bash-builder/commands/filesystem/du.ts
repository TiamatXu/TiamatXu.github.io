import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'du',
  desc: '统计文件或目录占用的磁盘空间',
  category: 'filesystem',
  arguments: [
    {
      name: 'path',
      type: 'path',
      required: false,
      desc: '要统计的路径',
      default: '.'
    }
  ],
  options: [
    {
      flag: '-h',
      type: 'boolean',
      desc: '以人类可读方式显示大小（如 1K、234M）',
      long: '--human-readable'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '只显示总计，不展开子目录',
      long: '--summarize'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示所有文件而不仅仅是目录',
      long: '--all'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '额外输出一行总计',
      long: '--total'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-h', '-s', '-a'],
      note: 'macOS 自带 BSD du 没有 GNU 的 -c（显示总计）选项，如需总计可改用 du -sh * | tail 手动累加。',
      source: 'BSD'
    }
  }
}

export default data
