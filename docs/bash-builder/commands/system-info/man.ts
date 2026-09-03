import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'man',
  desc: '查看命令的帮助手册',
  category: 'system-info',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要查询的命令名'
    }
  ],
  options: [
    {
      flag: '-k',
      type: 'string',
      desc: '按关键字搜索手册页（等价于 apropos）',
      long: '--apropos'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '显示命令的一行简介（等价于 whatis）',
      long: '--whatis'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示所有匹配的手册页',
      long: '--all'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'man 在 macOS 与 Linux 上均预装，用法一致；但 macOS 自带手册页内容通常针对 BSD 版本工具编写，对 GNU 专属选项的说明可能缺失或不同。',
      source: 'BSD'
    }
  }
}

export default data
