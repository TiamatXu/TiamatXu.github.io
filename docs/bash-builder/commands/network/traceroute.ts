import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'traceroute',
  desc: '追踪数据包到达目标经过的路由路径',
  category: 'network',
  arguments: [
    {
      name: 'host',
      type: 'string',
      required: true,
      desc: '目标主机名或 IP'
    }
  ],
  options: [
    {
      flag: '-m',
      type: 'string',
      desc: '设置最大跳数',
      long: '--max-hops'
    },
    {
      flag: '-w',
      type: 'string',
      desc: '设置每跳的超时时间（秒）',
      long: '--wait'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '只显示 IP，不做反向域名解析',
      long: '--numeric'
    },
    {
      flag: '-I',
      type: 'boolean',
      desc: '使用 ICMP ECHO 代替默认协议探测'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD traceroute（Darwin 内建），无需额外安装；而不少精简版 Linux 发行版（如 Ubuntu Server）默认不预装 traceroute，需要 apt install traceroute，默认探测协议（UDP/ICMP）也可能因实现不同而不同。',
      source: 'BSD'
    }
  }
}

export default data
