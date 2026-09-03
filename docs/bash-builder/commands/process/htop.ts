import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'htop',
  desc: '交互式、可视化程度更高的进程查看工具（top 的增强版）',
  category: 'process',
  options: [
    {
      flag: '-u',
      type: 'string',
      desc: '只显示指定用户的进程'
    },
    {
      flag: '-p',
      type: 'string',
      desc: '只显示指定 PID 的进程'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install htop',
      note: 'htop 在 macOS 与大多数 Linux 发行版上均不预装，需要分别通过 brew install htop 或 apt/yum install htop 安装。'
    }
  }
}

export default data
