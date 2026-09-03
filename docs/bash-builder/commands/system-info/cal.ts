import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cal',
  desc: '以日历形式显示日期',
  category: 'system-info',
  options: [
    {
      flag: '-y',
      type: 'boolean',
      desc: '显示整年日历',
      long: '--year'
    },
    {
      flag: '-3',
      type: 'boolean',
      desc: '显示上月/本月/下月三个月的日历'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'cal 在 macOS 与 Linux 上基础用法一致，部分发行版默认由 ncal/util-linux 提供，个别显示细节（如一周起始日）可能不同。',
      source: 'BSD'
    }
  }
}

export default data
