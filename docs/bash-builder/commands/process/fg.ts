import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'fg',
  desc: '将后台作业切回前台运行',
  category: 'process',
  arguments: [
    {
      name: 'job',
      type: 'string',
      required: false,
      desc: '作业编号，如 %1，省略则操作最近一个作业'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'fg 是 shell 内建命令，两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
