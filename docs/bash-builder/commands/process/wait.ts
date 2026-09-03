import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'wait',
  desc: '等待后台作业/进程结束并获取其退出状态',
  category: 'process',
  arguments: [
    {
      name: 'pid',
      type: 'string',
      required: false,
      desc: '要等待的作业编号或 PID，省略则等待全部'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'wait 是 shell 内建命令，两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
