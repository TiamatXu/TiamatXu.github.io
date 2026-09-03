import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'timedatectl',
  desc: '查看或设置系统时间、时区、NTP 同步状态（systemd）',
  category: 'system-info',
  options: [
    {
      flag: 'status',
      type: 'boolean',
      desc: '显示当前时间/时区/同步状态'
    },
    {
      flag: 'set-timezone',
      type: 'string',
      desc: '设置系统时区'
    }
  ],
  variants: {
    ubuntu: {
      supported: true,
      note: '需要 systemd（Ubuntu 15.04 及之后版本默认自带）。'
    },
    centos: {
      supported: true,
      note: '需要 systemd（CentOS 7 及之后版本默认自带）。'
    },
    bsd: {
      supported: false,
      note: 'timedatectl 是 systemd 生态专属命令，macOS 没有该命令，查看/设置时间与时区请使用 date 命令或“系统设置”，也可用 systemsetup -gettimezone 等命令行工具（需管理员权限）。'
    }
  }
}

export default data
