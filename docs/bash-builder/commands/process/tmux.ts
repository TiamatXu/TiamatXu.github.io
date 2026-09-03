import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tmux',
  desc: '更现代的终端多路复用/会话保持工具',
  category: 'process',
  options: [
    {
      flag: 'new',
      type: 'string',
      desc: '创建一个新会话'
    },
    {
      flag: 'attach',
      type: 'string',
      desc: '连接到一个已存在的会话'
    },
    {
      flag: 'ls',
      type: 'boolean',
      desc: '列出当前所有会话'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install tmux',
      note: 'tmux 在 macOS 与大多数 Linux 发行版上均不预装，需要分别通过 brew install tmux 或 apt/yum install tmux 安装，安装后命令与配置文件语法完全一致。'
    }
  }
}

export default data
