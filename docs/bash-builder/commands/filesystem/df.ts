import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'df',
  desc: '查看磁盘/文件系统空间使用情况',
  category: 'filesystem',
  options: [
    {
      flag: '-h',
      type: 'boolean',
      desc: '以人类可读方式显示大小',
      long: '--human-readable'
    },
    {
      flag: '-T',
      type: 'boolean',
      desc: '显示每个文件系统的类型',
      long: '--print-type'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '显示 inode 使用情况',
      long: '--inodes'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-h', '-i'],
      note: 'macOS 自带 BSD df 没有 GNU 的 -T（显示文件系统类型）选项，可用 mount 命令查看文件系统类型作为替代。',
      source: 'BSD'
    }
  }
}

export default data
