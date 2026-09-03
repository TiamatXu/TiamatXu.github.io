import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'dmesg',
  desc: '显示内核环形缓冲区的启动/运行日志',
  category: 'system-info',
  options: [
    {
      flag: '-T',
      type: 'boolean',
      desc: '以可读的时间格式显示时间戳',
      long: '--ctime'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '显示后清空缓冲区',
      long: '--read-clear'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: [],
      note: 'macOS 自带 dmesg，但由于系统完整性保护（SIP）等限制，普通权限下能看到的内核日志内容比 Linux 上少很多，常需要配合 sudo 或改用 Console.app / log show 查看更完整的系统日志。',
      source: 'BSD'
    }
  }
}

export default data
