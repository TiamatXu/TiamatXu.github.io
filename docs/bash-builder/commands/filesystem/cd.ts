import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cd',
  desc: '切换当前工作目录',
  category: 'filesystem',
  arguments: [
    {
      name: 'path',
      type: 'path',
      required: false,
      desc: '要切换到的目标目录，省略时切换到 $HOME'
    }
  ],
  options: [
    {
      flag: '-L',
      type: 'boolean',
      desc: '遇到符号链接时按逻辑路径解析（默认）'
    },
    {
      flag: '-P',
      type: 'boolean',
      desc: '遇到符号链接时解析为物理路径'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'cd 是 shell 内建命令而非独立二进制文件，macOS 与 Linux 上的 bash/zsh 内建行为一致，无兼容性差异。',
      source: 'BSD'
    }
  }
}

export default data
