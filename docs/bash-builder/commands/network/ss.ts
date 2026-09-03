import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ss',
  desc: '查看 socket 统计信息（netstat 的现代替代品）',
  category: 'network',
  options: [
    {
      flag: '-t',
      type: 'boolean',
      desc: '只显示 TCP 连接',
      long: '--tcp'
    },
    {
      flag: '-u',
      type: 'boolean',
      desc: '只显示 UDP 连接',
      long: '--udp'
    },
    {
      flag: '-l',
      type: 'boolean',
      desc: '只显示监听状态的 socket',
      long: '--listening'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '以数字形式显示地址和端口',
      long: '--numeric'
    },
    {
      flag: '-p',
      type: 'boolean',
      desc: '显示使用该 socket 的进程',
      long: '--processes'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'ss 属于 Linux 专属的 iproute2 工具集，macOS 没有该命令，需要使用 netstat 或 lsof -i 代替。'
    }
  }
}

export default data
