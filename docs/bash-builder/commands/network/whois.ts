import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'whois',
  desc: '查询域名/IP 的注册信息',
  category: 'network',
  arguments: [
    {
      name: 'target',
      type: 'string',
      required: true,
      desc: '要查询的域名或 IP'
    }
  ],
  options: [
    {
      flag: '-h',
      type: 'string',
      desc: '指定查询使用的 whois 服务器'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'whois 在 macOS 与 Linux 上均默认预装，基础用法一致。',
      source: 'BSD'
    }
  }
}

export default data
