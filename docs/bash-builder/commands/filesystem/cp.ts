import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cp',
  desc: '复制文件或目录',
  category: 'filesystem',
  arguments: [
    {
      name: 'source',
      type: 'path',
      required: true,
      desc: '源文件或目录',
      multiple: true
    },
    {
      name: 'dest',
      type: 'path',
      required: true,
      desc: '目标路径'
    }
  ],
  options: [
    {
      flag: '-r',
      type: 'boolean',
      desc: '递归复制目录',
      long: '--recursive'
    },
    {
      flag: '-R',
      type: 'boolean',
      desc: '递归复制目录（等价于 -r）',
      long: '--recursive'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '强制覆盖已存在的目标文件',
      long: '--force'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '覆盖前进行提示确认',
      long: '--interactive'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示复制过程的详细信息',
      long: '--verbose'
    },
    {
      flag: '-p',
      type: 'boolean',
      desc: '保留文件的权限、时间戳等属性',
      long: '--preserve'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '归档模式，等价于 -dR --preserve=all',
      long: '--archive'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-r', '-R', '-f', '-i', '-v', '-p'],
      note: 'macOS 自带 BSD cp 没有 -a（archive）这个组合选项，如需保留权限、时间戳并递归复制，请使用 -R -p 组合代替 GNU 的 -a。',
      source: 'BSD'
    }
  }
}

export default data
