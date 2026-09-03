import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'yes',
  desc: '无限重复输出指定字符串，常用于自动确认交互式提示',
  category: 'other',
  arguments: [
    {
      name: 'text',
      type: 'string',
      required: false,
      desc: '要重复输出的字符串，默认为 y'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'yes 是一个极简小工具，在 macOS 与 Linux 上行为完全一致。',
      source: 'BSD'
    }
  }
}

export default data
