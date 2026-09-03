import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'pfctl',
  desc: 'macOS/BSD 数据包过滤防火墙（PF）控制工具',
  category: 'network',
  options: [
    {
      flag: '-s',
      type: 'string',
      desc: '显示指定类型的信息，如 rules、states',
      long: '--show'
    },
    {
      flag: '-f',
      type: 'string',
      desc: '从指定配置文件加载规则',
      long: '--file'
    },
    {
      flag: '-e',
      type: 'boolean',
      desc: '启用 PF 防火墙',
      long: '--enable'
    },
    {
      flag: '-d',
      type: 'boolean',
      desc: '禁用 PF 防火墙',
      long: '--disable'
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'PF（Packet Filter）是 BSD 系统的防火墙框架，Linux 上没有 pfctl，对应的是 iptables/nftables 或其上层封装 ufw。'
    },
    centos: {
      supported: false,
      note: 'PF（Packet Filter）是 BSD 系统的防火墙框架，Linux 上没有 pfctl，对应的是 iptables/firewalld。'
    },
    bsd: {
      supported: true,
      note: 'pfctl 是 macOS 底层基于 PF（Packet Filter）框架的防火墙控制命令，图形化的“应用程序防火墙”只是其中面向应用层的一小部分设置。',
      source: 'BSD'
    }
  }
}

export default data
