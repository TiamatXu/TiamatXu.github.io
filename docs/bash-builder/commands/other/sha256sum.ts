import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sha256sum',
  desc: '计算并校验文件的 SHA-256 哈希值',
  category: 'other',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要计算哈希的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-c',
      type: 'boolean',
      desc: '根据校验和文件核对哈希值',
      long: '--check'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'macOS 没有 sha256sum 命令，需要使用系统自带的 shasum -a 256 代替。'
    }
  }
}

export default data
