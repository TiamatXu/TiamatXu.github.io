import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'eval',
  desc: '将字符串作为命令进行拼接并执行',
  category: 'other',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要拼接执行的字符串'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'eval 是 shell 内建命令，两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
