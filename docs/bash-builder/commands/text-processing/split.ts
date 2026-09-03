import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'split',
  desc: '将大文件切分为多个小文件',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要切分的文件'
    },
    {
      name: 'prefix',
      type: 'string',
      required: false,
      desc: '输出文件名前缀'
    }
  ],
  options: [
    {
      flag: '-b',
      type: 'string',
      desc: '按字节大小切分（如 10M）',
      long: '--bytes'
    },
    {
      flag: '-l',
      type: 'string',
      desc: '按行数切分',
      long: '--lines'
    },
    {
      flag: '-d',
      type: 'boolean',
      desc: '使用数字后缀而非字母后缀',
      long: '--numeric-suffixes'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD split 支持 -b/-l/-d 等常用选项，用法与 GNU split 基本一致；--additional-suffix 等个别 GNU 长选项不受支持。',
      source: 'BSD'
    }
  }
}

export default data
