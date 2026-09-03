import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'dig',
  desc: 'DNS 查询工具',
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
      flag: '-x',
      type: 'string',
      desc: '反向查询（IP 转域名）'
    },
    {
      flag: '-t',
      type: 'string',
      desc: '指定查询的记录类型',
      long: '-type'
    },
    {
      flag: '-p',
      type: 'string',
      desc: '指定 DNS 服务器端口'
    },
    {
      flag: '+short',
      type: 'boolean',
      desc: '仅输出简洁结果'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 dig（来自 BIND 工具集），用法与 Linux 版本基本一致；较新版本 macOS 有逐步精简自带网络工具的趋势，如遇缺失可通过 brew install bind 补充。',
      source: 'BSD'
    }
  }
}

export default data
