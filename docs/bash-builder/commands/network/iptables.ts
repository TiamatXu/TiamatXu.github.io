import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'iptables',
  desc: 'Linux 内核 netfilter 防火墙规则配置工具',
  category: 'network',
  options: [
    {
      flag: '-L',
      type: 'boolean',
      desc: '列出当前防火墙规则',
      long: '--list'
    },
    {
      flag: '-A',
      type: 'string',
      desc: '向指定链追加一条规则',
      long: '--append'
    },
    {
      flag: '-F',
      type: 'boolean',
      desc: '清空指定链的所有规则',
      long: '--flush'
    }
  ],
  variants: {
    ubuntu: {
      supported: true,
      note: '较新版本 Ubuntu 默认更推荐使用其上层封装 ufw，但底层 iptables/nftables 仍然存在。'
    },
    centos: {
      supported: true,
      note: 'CentOS 7 及之后版本默认使用 firewalld 作为上层管理工具，但底层同样基于 iptables/nftables。'
    },
    bsd: {
      supported: false,
      note: 'iptables 基于 Linux 内核的 netfilter 框架，macOS 没有该命令；macOS/BSD 上对应的包过滤防火墙工具是 pfctl（基于 PF）。'
    }
  }
}

export default data
