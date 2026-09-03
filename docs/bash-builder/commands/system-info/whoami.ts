import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'whoami',
  desc: '显示当前登录用户名',
  category: 'system-info',
  variants: {
    bsd: {
      supported: true,
      source: 'BSD'
    }
  }
}

export default data
