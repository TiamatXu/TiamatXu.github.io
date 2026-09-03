import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'host',
  desc: '简洁的 DNS 查询工具',
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
      flag: '-t',
      type: 'string',
      desc: '指定查询的记录类型'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '查询所有可用记录',
      long: '--all'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'host 命令（来自 BIND 工具集）在 macOS 与 Linux 上均预装，用法一致。',
      source: 'BSD'
    }
  }
}

export default data
