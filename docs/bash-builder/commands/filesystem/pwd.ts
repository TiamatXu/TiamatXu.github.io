import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'pwd',
  desc: '显示当前工作目录的绝对路径',
  category: 'filesystem',
  options: [
    {
      flag: '-L',
      type: 'boolean',
      desc: '显示逻辑路径（含符号链接，默认）'
    },
    {
      flag: '-P',
      type: 'boolean',
      desc: '显示物理路径（解析所有符号链接）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'pwd 为 POSIX 标准命令，shell 内建版本与 /bin/pwd 在两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
