import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'uuidgen',
  desc: '生成一个随机的 UUID',
  category: 'other',
  variants: {
    bsd: {
      supported: true,
      note: 'uuidgen 在 macOS 与 Linux（util-linux）上均预装，生成的标准 UUID 格式完全一致。',
      source: 'BSD'
    }
  }
}

export default data
