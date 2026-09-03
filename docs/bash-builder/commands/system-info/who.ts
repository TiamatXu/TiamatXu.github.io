import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'who',
  desc: '显示当前登录系统的用户',
  category: 'system-info',
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示全部信息',
      long: '--all'
    },
    {
      flag: '-b',
      type: 'boolean',
      desc: '显示系统上次启动时间',
      long: '--boot'
    },
    {
      flag: '-q',
      type: 'boolean',
      desc: '仅显示用户名列表和总数',
      long: '--count'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      source: 'BSD'
    }
  }
}

export default data
