import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tr',
  desc: '字符转换、删除或压缩',
  category: 'text-processing',
  arguments: [
    {
      name: 'set1',
      type: 'string',
      required: true,
      desc: '源字符集合'
    },
    {
      name: 'set2',
      type: 'string',
      required: false,
      desc: '目标字符集合'
    }
  ],
  options: [
    {
      flag: '-d',
      type: 'boolean',
      desc: '删除指定字符集合中的字符',
      long: '--delete'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '压缩连续重复的字符',
      long: '--squeeze-repeats'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '对字符集合取补集',
      long: '--complement'
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
