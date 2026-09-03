import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'screen',
  desc: '终端多路复用/会话保持工具',
  category: 'process',
  options: [
    {
      flag: '-S',
      type: 'string',
      desc: '创建并命名一个新会话',
      long: '--session'
    },
    {
      flag: '-r',
      type: 'string',
      desc: '恢复（reattach）一个已存在的会话',
      long: '--resume'
    },
    {
      flag: '-ls',
      type: 'boolean',
      desc: '列出当前所有会话',
      long: '--list'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'screen（BSD 版本）长期作为 macOS 自带工具随系统预装，但苹果近年来在逐步精简系统自带的传统 Unix 工具，是否会在未来版本中移除还需留意；更现代的同类工具可考虑 tmux。',
      source: 'BSD'
    }
  }
}

export default data
