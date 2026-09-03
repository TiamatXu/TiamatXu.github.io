import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'csplit',
  desc: '按上下文模式（正则/行号）将文件切分为多个文件',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要切分的文件'
    },
    {
      name: 'pattern',
      type: 'string',
      required: true,
      desc: '切分依据，如行号或 /正则/',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'string',
      desc: '指定输出文件名前缀',
      long: '--prefix'
    },
    {
      flag: '-k',
      type: 'boolean',
      desc: '即使发生错误也保留已生成的输出文件',
      long: '--keep-files'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'csplit 是 POSIX 标准命令，在 macOS 与 Linux 上均预装，基础用法一致。',
      source: 'BSD'
    }
  }
}

export default data
