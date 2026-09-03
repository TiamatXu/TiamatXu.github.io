import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'uniq',
  desc: '去除或统计相邻重复行',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要处理的文件路径'
    }
  ],
  options: [
    {
      flag: '-c',
      type: 'boolean',
      desc: '在每行前显示重复次数',
      long: '--count'
    },
    {
      flag: '-d',
      type: 'boolean',
      desc: '只显示重复过的行',
      long: '--repeated'
    },
    {
      flag: '-u',
      type: 'boolean',
      desc: '只显示未重复的行',
      long: '--unique'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '比较时忽略大小写',
      long: '--ignore-case'
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
