import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'watch',
  desc: '周期性重复执行命令并全屏显示输出',
  category: 'other',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要周期执行的命令'
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'string',
      desc: '指定刷新间隔（秒）',
      long: '--interval'
    },
    {
      flag: '-d',
      type: 'boolean',
      desc: '高亮显示前后两次输出的差异',
      long: '--differences'
    },
    {
      flag: '-t',
      type: 'boolean',
      desc: '不显示顶部的标题栏',
      long: '--no-title'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install watch',
      note: 'watch 属于 Linux 的 procps 工具集，macOS 默认不自带，需要通过 Homebrew 自行安装。'
    }
  }
}

export default data
