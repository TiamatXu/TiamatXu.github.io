import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'md5sum',
  desc: '计算并校验文件的 MD5 哈希值',
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
      note: 'macOS 没有 md5sum 命令，需要使用系统自带的 md5 命令代替（如 md5 file，或用 md5 -r 输出更接近 md5sum 的格式）。'
    }
  }
}

export default data
