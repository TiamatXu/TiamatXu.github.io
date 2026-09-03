import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'join',
  desc: '按公共字段连接两个已排序文件的行',
  category: 'text-processing',
  arguments: [
    {
      name: 'file1',
      type: 'file',
      required: true,
      desc: '第一个文件（需已排序）'
    },
    {
      name: 'file2',
      type: 'file',
      required: true,
      desc: '第二个文件（需已排序）'
    }
  ],
  options: [
    {
      flag: '-1',
      type: 'string',
      desc: '指定文件1用于匹配的字段'
    },
    {
      flag: '-2',
      type: 'string',
      desc: '指定文件2用于匹配的字段'
    },
    {
      flag: '-t',
      type: 'string',
      desc: '指定字段分隔符'
    },
    {
      flag: '-a',
      type: 'string',
      desc: '额外输出指定文件中无法匹配的行'
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
