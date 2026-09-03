import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'kill',
  desc: '向进程发送信号（默认 SIGTERM）',
  category: 'process',
  arguments: [
    {
      name: 'pid',
      type: 'number',
      required: true,
      desc: '目标进程 PID',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-9',
      type: 'boolean',
      desc: '发送 SIGKILL 强制终止进程'
    },
    {
      flag: '-s',
      type: 'string',
      desc: '指定要发送的信号名称或编号',
      long: '--signal'
    },
    {
      flag: '-l',
      type: 'boolean',
      desc: '列出所有可用信号名称',
      long: '--list'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'kill 是 POSIX 标准命令，macOS 与 Linux 上基础用法一致。',
      source: 'BSD'
    }
  }
}

export default data
