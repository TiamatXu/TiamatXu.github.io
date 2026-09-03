import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ip',
  desc: '新一代网络配置工具（接口/路由/地址管理）',
  category: 'network',
  arguments: [
    {
      name: 'object',
      type: 'string',
      required: true,
      desc: '操作对象，如 addr/link/route'
    }
  ],
  options: [
    {
      flag: '-4',
      type: 'boolean',
      desc: '仅显示 IPv4 信息'
    },
    {
      flag: '-6',
      type: 'boolean',
      desc: '仅显示 IPv6 信息'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '显示更详细的统计信息',
      long: '--stats'
    },
    {
      flag: '-br',
      type: 'boolean',
      desc: '以简洁格式显示',
      long: '--brief'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'ip 命令属于 Linux 专属的 iproute2 工具集，macOS 没有该命令，网络接口配置需使用 ifconfig、networksetup 或系统偏好设置代替。'
    }
  }
}

export default data
