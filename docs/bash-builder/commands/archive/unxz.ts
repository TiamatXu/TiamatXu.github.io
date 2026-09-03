import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'unxz',
  desc: '解压 xz 压缩文件（等价于 xz -d）',
  category: 'archive',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要解压的 .xz 文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-k',
      type: 'boolean',
      desc: '解压后保留原始 .xz 文件',
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
      supported: false,
      install: 'brew install xz',
      note: 'unxz 随 xz-utils 一同提供，macOS 默认不自带，需要通过 Homebrew 自行安装。'
    }
  }
}

export default data
