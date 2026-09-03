import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'fmt',
  desc: '简单的文本段落格式化/自动换行工具',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要格式化的文件路径'
    }
  ],
  options: [
    {
      flag: '-w',
      type: 'string',
      desc: '指定输出的最大行宽',
      long: '--width'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '仅在已有换行处拆分，不合并段落',
      long: '--split-only'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'fmt 的基础用法（-w 指定宽度）在 macOS 与 Linux 上一致。',
      source: 'BSD'
    }
  }
}

export default data
