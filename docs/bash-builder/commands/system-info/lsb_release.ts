import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'lsb_release',
  desc: '显示 Linux 发行版标准信息（发行版名称、版本代号等）',
  category: 'system-info',
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示所有可用信息',
      long: '--all'
    },
    {
      flag: '-d',
      type: 'boolean',
      desc: '只显示发行版描述信息',
      long: '--description'
    }
  ],
  variants: {
    ubuntu: {
      supported: true,
      note: 'Ubuntu/Debian 通常默认预装（由 lsb-release 包提供）。'
    },
    centos: {
      supported: false,
      install: 'sudo yum install redhat-lsb-core',
      note: 'CentOS/RHEL 默认不预装，需要单独安装 redhat-lsb-core。'
    },
    bsd: {
      supported: false,
      note: 'lsb_release 是 Linux 标准库（LSB）工具，macOS 没有对应命令；查看 macOS 系统版本信息的对应命令是 sw_vers。'
    }
  }
}

export default data
