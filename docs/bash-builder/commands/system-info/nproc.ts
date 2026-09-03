import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'nproc',
  desc: '显示可用的处理器核心数量',
  category: 'system-info',
  options: [
    {
      flag: '--all',
      type: 'boolean',
      desc: '统计所有核心（含被禁用/离线的）'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'nproc 属于 GNU coreutils，macOS 没有该命令，可使用 sysctl -n hw.ncpu 获取 CPU 核心数量。'
    }
  }
}

export default data
