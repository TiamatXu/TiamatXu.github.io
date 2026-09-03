import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'dirname',
  desc: '从路径中提取目录部分',
  category: 'filesystem',
  arguments: [
    {
      name: 'path',
      type: 'path',
      required: true,
      desc: '文件路径'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'dirname 是 POSIX 标准工具，仅接受路径参数、不带其他选项，macOS 与 Linux 行为完全一致。',
      source: 'BSD'
    }
  }
}

export default data
