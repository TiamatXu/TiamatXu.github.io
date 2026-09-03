import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'jobs',
  desc: '列出当前 shell 会话中的后台/挂起作业',
  category: 'process',
  options: [
    {
      flag: '-l',
      type: 'boolean',
      desc: '同时显示进程 PID',
      long: '--list'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '只列出正在运行的作业',
      long: '--running'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '只列出已停止的作业',
      long: '--stopped'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'jobs 是 shell（bash/zsh）内建命令，两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
