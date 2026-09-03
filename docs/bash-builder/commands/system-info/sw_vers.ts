import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sw_vers',
  desc: '显示 macOS 系统的产品名称、版本号与构建号',
  category: 'system-info',
  options: [
    {
      flag: '-productVersion',
      type: 'boolean',
      desc: '仅显示系统版本号'
    },
    {
      flag: '-buildVersion',
      type: 'boolean',
      desc: '仅显示构建号'
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'sw_vers 是 macOS 专属命令，Linux 上没有对应命令；查看发行版信息可用 cat /etc/os-release 或 lsb_release -a。'
    },
    centos: {
      supported: false,
      note: 'sw_vers 是 macOS 专属命令，Linux 上没有对应命令；查看发行版信息可用 cat /etc/os-release 或 cat /etc/redhat-release。'
    },
    bsd: {
      supported: true,
      note: 'sw_vers 是 macOS 独有的系统信息命令，用于查看当前 macOS 的产品名称（如 macOS）、版本号与构建号，Linux 上没有直接对应的命令。',
      source: 'BSD'
    }
  }
}

export default data
