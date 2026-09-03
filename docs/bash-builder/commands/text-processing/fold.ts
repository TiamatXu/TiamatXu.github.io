import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'fold',
  desc: '将文本行按指定宽度强制换行',
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
      flag: '-w',
      type: 'string',
      desc: '指定换行宽度（字符数）',
      long: '--width'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '尽量在单词边界处换行',
      long: '--spaces'
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
