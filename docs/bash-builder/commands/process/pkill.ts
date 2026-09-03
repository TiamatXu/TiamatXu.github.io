import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'pkill',
  desc: '按名称/属性匹配并向进程发送信号',
  category: 'process',
  arguments: [
    {
      name: 'pattern',
      type: 'pattern',
      required: true,
      desc: '用于匹配进程名的模式'
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'boolean',
      desc: '匹配完整命令行而非仅进程名',
      long: '--full'
    },
    {
      flag: '-u',
      type: 'string',
      desc: '按用户过滤',
      long: '--euid'
    },
    {
      flag: '-9',
      type: 'boolean',
      desc: '发送 SIGKILL 强制终止进程'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'pkill 在 macOS 上原生自带（并非移植自 Linux procps），常用选项 -f/-u 与信号相关用法与 Linux 版本一致。',
      source: 'BSD'
    }
  }
}

export default data
