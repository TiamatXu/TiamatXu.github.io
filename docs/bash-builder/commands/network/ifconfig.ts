import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ifconfig',
  desc: '配置或查看网络接口信息',
  category: 'network',
  arguments: [
    {
      name: 'interface',
      type: 'string',
      required: false,
      desc: '网络接口名称，如 eth0/en0'
    },
    {
      name: 'action',
      type: 'string',
      required: false,
      desc: '如 up/down，启用或禁用接口'
    }
  ],
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示所有接口（含未激活的）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD ifconfig，输出格式与字段名与 Linux 版本有一定差异（如接口命名为 en0 而非 eth0）；Linux 上 ifconfig 已被标记为过时，部分精简发行版默认不预装，需要额外安装 net-tools。',
      source: 'BSD'
    }
  }
}

export default data
