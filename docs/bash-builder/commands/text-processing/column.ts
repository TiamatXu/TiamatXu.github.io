import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'column',
  desc: '将输入内容格式化为整齐的多列表格',
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
      flag: '-t',
      type: 'boolean',
      desc: '自动按空白对齐为表格',
      long: '--table'
    },
    {
      flag: '-s',
      type: 'string',
      desc: '指定输入字段分隔符',
      long: '--separator'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'column 在 macOS（BSD）与 Linux（util-linux）上均预装，最常用的 -t 表格化用法一致；两者对分隔符、对齐细节的默认处理略有差异。',
      source: 'BSD'
    }
  }
}

export default data
