import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'bg',
  desc: '将挂起的作业转到后台继续运行',
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
      note: 'bg 是 shell 内建命令，两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
