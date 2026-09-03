import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'strace',
  desc: '跟踪并记录进程发起的系统调用（syscall）',
  category: 'process',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要跟踪的命令'
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'string',
      desc: '附加到指定 PID 的正在运行进程'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '统计各系统调用的耗时与次数摘要',
      long: '--summary-only'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '同时跟踪子进程',
      long: '--follow-forks'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'strace 基于 Linux 内核的 ptrace 机制实现，macOS 完全没有对应命令；系统调用级别的跟踪需改用基于 DTrace 的 dtruss（部分功能受 SIP 限制需临时关闭），或使用 Instruments.app 进行更高层的性能分析。'
    }
  }
}

export default data
