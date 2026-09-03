import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'nmap',
  desc: '网络端口扫描与主机发现工具',
  category: 'network',
  arguments: [
    {
      name: 'target',
      type: 'string',
      required: true,
      desc: '扫描目标，主机名/IP/网段'
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'string',
      desc: '指定扫描的端口范围',
      long: '--ports'
    },
    {
      flag: '-sV',
      type: 'boolean',
      desc: '探测开放端口对应的服务版本'
    },
    {
      flag: '-A',
      type: 'boolean',
      desc: '启用系统探测、版本探测等综合分析',
      long: '--aggressive'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install nmap',
      note: 'nmap 在 macOS 与大多数 Linux 发行版上均不预装，需要分别通过 brew install nmap 或 apt/yum install nmap 自行安装，安装后命令行用法完全一致。'
    }
  }
}

export default data
