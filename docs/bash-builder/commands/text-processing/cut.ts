import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cut',
  desc: '按列提取文本内容',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要处理的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-d',
      type: 'string',
      desc: '指定字段分隔符',
      long: '--delimiter'
    },
    {
      flag: '-f',
      type: 'string',
      desc: '指定要提取的字段',
      long: '--fields'
    },
    {
      flag: '-c',
      type: 'string',
      desc: '按字符位置提取',
      long: '--characters'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '仅输出包含分隔符的行',
      long: '--only-delimited'
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
