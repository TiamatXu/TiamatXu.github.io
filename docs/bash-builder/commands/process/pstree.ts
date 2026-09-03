import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'pstree',
  desc: '以树状结构显示进程之间的父子关系',
  category: 'process',
  options: [
    {
      flag: '-p',
      type: 'boolean',
      desc: '同时显示每个进程的 PID',
      long: '--show-pids'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '同时显示每个进程的启动参数',
      long: '--arguments'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install pstree',
      note: 'macOS 默认不自带 pstree 命令，需要通过 Homebrew 自行安装；也可用 ps -ef 结合 PPID 列手动分析进程树。'
    }
  }
}

export default data
