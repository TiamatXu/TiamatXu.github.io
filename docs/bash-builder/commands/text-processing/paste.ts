import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'paste',
  desc: '按行合并多个文件内容',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要合并的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-d',
      type: 'string',
      desc: '指定合并时使用的分隔符',
      long: '--delimiters'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '将每个文件合并为一行（串行模式）',
      long: '--serial'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      source: 'BSD'
    }
  }
}

export default data
