import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'lspci',
  desc: '列出系统识别到的 PCI 设备',
  category: 'system-info',
  variants: {
    bsd: {
      supported: false,
      note: 'lspci 属于 Linux 专属的 pciutils 工具集，macOS 没有该命令；可尝试 system_profiler SPPCIDataType 查看部分信息，但在 Apple Silicon 机型上参考价值有限，因为其架构已不再采用传统 PCI 总线组织内部设备。'
    }
  }
}

export default data
