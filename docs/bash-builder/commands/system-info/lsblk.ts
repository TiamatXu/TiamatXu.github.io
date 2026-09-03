import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'lsblk',
  desc: '以树状结构列出块设备（磁盘/分区）信息',
  category: 'system-info',
  options: [
    {
      flag: '-f',
      type: 'boolean',
      desc: '同时显示文件系统类型信息',
      long: '--fs'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'lsblk 属于 Linux 专属的 util-linux 工具集，macOS 没有该命令，可用 diskutil list 查看磁盘与分区信息。'
    }
  }
}

export default data
