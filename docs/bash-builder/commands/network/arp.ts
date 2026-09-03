import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'arp',
  desc: '查看或修改 ARP 缓存表',
  category: 'network',
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示当前 ARP 缓存表',
      long: '--all'
    },
    {
      flag: '-d',
      type: 'string',
      desc: '删除指定的 ARP 缓存条目',
      long: '--delete'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD arp，-a 查看缓存表的基础用法与 Linux 上传统 net-tools 版本一致；Linux 上该命令已逐渐被 ip neigh 取代。',
      source: 'BSD'
    }
  }
}

export default data
