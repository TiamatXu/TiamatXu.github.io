import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'w',
  desc: '显示当前登录用户及其正在运行的进程',
  category: 'system-info',
  options: [
    {
      flag: '-h',
      type: 'boolean',
      desc: '不显示表头',
      long: '--no-header'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '使用简短输出格式',
      long: '--short'
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
