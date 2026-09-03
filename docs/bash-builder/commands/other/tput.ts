import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tput',
  desc: '查询/设置终端能力（如颜色、光标位置），常用于脚本着色',
  category: 'other',
  arguments: [
    {
      name: 'capability',
      type: 'string',
      required: true,
      desc: '终端能力名称，如 setaf、cols、clear'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'tput 基于 terminfo/ncurses，在 macOS 与 Linux 上均预装，常用能力名称（如 setaf 前景色、bold 加粗、sgr0 重置）通用。',
      source: 'BSD'
    }
  }
}

export default data
