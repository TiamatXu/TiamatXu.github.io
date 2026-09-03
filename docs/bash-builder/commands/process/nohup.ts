import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'nohup',
  desc: '使命令忽略挂起信号，让进程在终端关闭后继续运行',
  category: 'process',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要执行的命令'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'nohup 是 POSIX 标准命令，macOS 与 Linux 上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
