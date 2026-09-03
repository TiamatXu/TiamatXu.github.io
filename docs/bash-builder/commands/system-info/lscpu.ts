import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'lscpu',
  desc: '显示 CPU 架构详细信息',
  category: 'system-info',
  variants: {
    bsd: {
      supported: false,
      note: 'lscpu 属于 Linux 专属的 util-linux 工具集，macOS 没有该命令，可用 sysctl -a | grep machdep.cpu 或 system_profiler SPHardwareDataType 查看 CPU 信息。'
    }
  }
}

export default data
