import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ufw',
  desc: 'Ubuntu 提供的简化版防火墙配置前端（封装 iptables）',
  category: 'network',
  arguments: [
    {
      name: 'rule',
      type: 'string',
      required: false,
      desc: '如 allow 22/tcp、deny from 1.2.3.4'
    }
  ],
  options: [
    {
      flag: 'enable',
      type: 'boolean',
      desc: '启用防火墙'
    },
    {
      flag: 'disable',
      type: 'boolean',
      desc: '禁用防火墙'
    },
    {
      flag: 'status',
      type: 'boolean',
      desc: '查看当前防火墙状态与规则'
    }
  ],
  variants: {
    ubuntu: {
      supported: true,
      note: 'Ubuntu 默认预装 ufw（Uncomplicated Firewall）。'
    },
    centos: {
      supported: false,
      note: 'CentOS/RHEL 系默认使用 firewalld 而非 ufw，如需可手动安装 ufw 但并非官方推荐组合。'
    },
    bsd: {
      supported: false,
      note: 'ufw 是对 Linux iptables 的简化封装，macOS 没有对应命令；macOS 上直接管理防火墙请使用 pfctl，或系统设置中的应用程序防火墙。'
    }
  }
}

export default data
