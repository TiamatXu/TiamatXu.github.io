import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'free',
  desc: '查看内存使用情况',
  category: 'system-info',
  options: [
    {
      flag: '-h',
      type: 'boolean',
      desc: '以人类可读方式显示大小',
      long: '--human'
    },
    {
      flag: '-m',
      type: 'boolean',
      desc: '以 MB 为单位显示',
      long: '--mega'
    },
    {
      flag: '-g',
      type: 'boolean',
      desc: '以 GB 为单位显示',
      long: '--giga'
    },
    {
      flag: '-s',
      type: 'string',
      desc: '每隔指定秒数刷新显示一次',
      long: '--seconds'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'macOS 没有 free 命令，查看内存占用可使用 vm_stat、top -l 1 或 sysctl hw.memsize 代替。'
    }
  }
}

export default data
