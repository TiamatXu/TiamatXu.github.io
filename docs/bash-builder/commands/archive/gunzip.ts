import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'gunzip',
  desc: '解压 gzip 压缩文件（等价于 gzip -d）',
  category: 'archive',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要解压的 .gz 文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-k',
      type: 'boolean',
      desc: '解压后保留原始 .gz 文件',
      long: '--keep'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示处理过程的详细信息',
      long: '--verbose'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '强制覆盖已存在的目标文件',
      long: '--force'
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
