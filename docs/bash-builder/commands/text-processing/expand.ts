import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'expand',
  desc: '将文本中的制表符（Tab）转换为空格',
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
      flag: '-t',
      type: 'string',
      desc: '指定每个制表符对应的空格数',
      long: '--tabs'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'expand（及其反操作 unexpand）在 macOS 与 Linux 上均预装，用法一致。',
      source: 'BSD'
    }
  }
}

export default data
