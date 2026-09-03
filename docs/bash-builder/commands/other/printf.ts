import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'printf',
  desc: '按格式化字符串输出文本',
  category: 'other',
  arguments: [
    {
      name: 'format',
      type: 'string',
      required: true,
      desc: '格式字符串，如 %s\\n'
    },
    {
      name: 'argument',
      type: 'string',
      required: false,
      desc: '填充格式字符串的参数',
      multiple: true
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'printf 是 POSIX 标准命令，格式字符串语法在两个平台上一致。',
      source: 'BSD'
    }
  }
}

export default data
