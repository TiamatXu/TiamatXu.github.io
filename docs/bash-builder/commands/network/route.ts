import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'route',
  desc: '查看或修改系统路由表',
  category: 'network',
  options: [
    {
      flag: '-n',
      type: 'boolean',
      desc: '以数字形式显示地址，不做域名解析',
      long: '--numeric'
    },
    {
      flag: 'add',
      type: 'string',
      desc: '添加一条路由规则'
    },
    {
      flag: 'delete',
      type: 'string',
      desc: '删除一条路由规则'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD route，语法与 Linux 上传统 net-tools 版本的 route 存在差异；Linux 上该命令已逐渐被 ip route 取代，部分精简发行版默认不预装。',
      source: 'BSD'
    }
  }
}

export default data
