import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'clear',
  desc: '清空终端屏幕显示内容',
  category: 'other',
  variants: {
    bsd: {
      supported: true,
      note: 'clear 基于 terminfo，在 macOS 与 Linux 上均预装，行为一致。',
      source: 'BSD'
    }
  }
}

export default data
