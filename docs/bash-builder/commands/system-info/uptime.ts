import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'uptime',
  desc: '显示系统已运行时间及负载',
  category: 'system-info',
  options: [
    {
      flag: '-p',
      type: 'boolean',
      desc: '以“up 3 hours, 22 minutes”等易读格式显示',
      long: '--pretty'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: [],
      note: 'macOS 自带 BSD uptime 不支持 GNU coreutils 的 -p（易读格式）选项，只能输出传统的单行汇总格式。',
      source: 'BSD'
    }
  }
}

export default data
