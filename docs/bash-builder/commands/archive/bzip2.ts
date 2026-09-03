import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'bzip2',
  desc: '使用 Burrows-Wheeler 算法压缩文件（.bz2）',
  category: 'archive',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要压缩的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-d',
      type: 'boolean',
      desc: '解压缩',
      long: '--decompress'
    },
    {
      flag: '-k',
      type: 'boolean',
      desc: '压缩/解压后保留原始文件',
      long: '--keep'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示处理过程的详细信息',
      long: '--verbose'
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
