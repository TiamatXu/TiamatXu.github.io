import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'disown',
  desc: '将作业从当前 shell 的作业表中移除，使其不受 SIGHUP 影响',
  category: 'process',
  arguments: [
    {
      name: 'job',
      type: 'string',
      required: false,
      desc: '作业编号，如 %1，省略则操作最近一个作业'
    }
  ],
  options: [
    {
      flag: '-h',
      type: 'boolean',
      desc: '保留在作业表中，仅标记为不接收 SIGHUP',
      long: '--mark-hup'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '对所有作业生效',
      long: '--all'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'disown 是 shell（bash/zsh）内建命令，两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
