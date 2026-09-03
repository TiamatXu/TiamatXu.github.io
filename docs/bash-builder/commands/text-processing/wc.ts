import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'wc',
  desc: '统计行数、单词数、字节数',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要统计的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-l',
      type: 'boolean',
      desc: '统计行数',
      long: '--lines'
    },
    {
      flag: '-w',
      type: 'boolean',
      desc: '统计单词数',
      long: '--words'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '统计字节数',
      long: '--bytes'
    },
    {
      flag: '-m',
      type: 'boolean',
      desc: '统计字符数',
      long: '--chars'
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
