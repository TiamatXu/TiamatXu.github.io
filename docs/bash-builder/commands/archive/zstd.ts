import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'zstd',
  desc: 'Facebook 推出的高速压缩算法工具（.zst）',
  category: 'archive',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要压缩/解压的文件路径',
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
      flag: '-19',
      type: 'boolean',
      desc: '使用最高压缩级别（体积更小但更慢）'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install zstd',
      note: 'macOS 默认不自带独立的 zstd 命令行工具，需要通过 Homebrew 自行安装；较新版本的 Ubuntu（20.04+）等 Linux 发行版已将 zstd 作为基础系统工具预装。'
    }
  }
}

export default data
