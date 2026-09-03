import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'nslookup',
  desc: '交互式/命令行 DNS 查询工具',
  category: 'network',
  arguments: [
    {
      name: 'domain',
      type: 'string',
      required: true,
      desc: '要查询的域名'
    }
  ],
  options: [
    {
      flag: '-type',
      type: 'enum',
      desc: '指定查询的记录类型',
      choices: ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME']
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'nslookup 在 macOS 与 Linux 上均预装且用法一致，目前官方更推荐使用功能更完整的 dig。',
      source: 'BSD'
    }
  }
}

export default data
