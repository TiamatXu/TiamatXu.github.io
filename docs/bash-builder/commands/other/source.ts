import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'source',
  desc: '在当前 shell 中读取并执行脚本文件内容',
  category: 'other',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要读取执行的脚本文件'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'source（及等价的 . 命令）是 shell 内建命令，两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
