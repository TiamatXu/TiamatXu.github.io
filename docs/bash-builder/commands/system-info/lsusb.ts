import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'lsusb',
  desc: '列出系统识别到的 USB 设备',
  category: 'system-info',
  variants: {
    bsd: {
      supported: false,
      note: 'lsusb 属于 Linux 专属的 usbutils 工具集，macOS 没有该命令，可用 system_profiler SPUSBDataType 查看 USB 设备信息。'
    }
  }
}

export default data
