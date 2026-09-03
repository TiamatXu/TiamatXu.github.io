import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'xz',
  desc: '使用 LZMA2 算法压缩文件（.xz），压缩率通常优于 gzip/bzip2',
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
    },
    {
      flag: '-9',
      type: 'boolean',
      desc: '使用最高压缩级别（体积更小但更慢）'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install xz',
      note: 'macOS 默认不自带独立的 xz 命令行工具，需要通过 Homebrew 自行安装；系统自带的 tar/Archive Utility 通常能读取 .xz/.tar.xz，但没有独立的 xz/unxz 可执行文件。'
    }
  }
}

export default data
