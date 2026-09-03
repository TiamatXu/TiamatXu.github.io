import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'vm_stat',
  desc: '显示 macOS 虚拟内存/内存分页统计信息',
  category: 'system-info',
  options: [
    {
      flag: '-c',
      type: 'string',
      desc: '按指定次数与间隔重复采样'
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'vm_stat 是 macOS 专属命令，Linux 上没有对应命令；查看内存情况可用 free -h 或 vmstat。'
    },
    centos: {
      supported: false,
      note: 'vm_stat 是 macOS 专属命令，Linux 上没有对应命令；查看内存情况可用 free -h 或 vmstat。'
    },
    bsd: {
      supported: true,
      note: 'vm_stat 是 macOS 独有的内存/分页统计命令，是 macOS 上没有 free 命令时最常用的替代方案之一。',
      source: 'BSD'
    }
  }
}

export default data
