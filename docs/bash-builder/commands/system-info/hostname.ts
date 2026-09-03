import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'hostname',
  desc: '显示或设置主机名',
  category: 'system-info',
  options: [
    {
      flag: '-s',
      type: 'boolean',
      desc: '仅显示短主机名（不含域名部分）',
      long: '--short'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '显示完整限定域名 FQDN',
      long: '--fqdn'
    },
    {
      flag: '-I',
      type: 'boolean',
      desc: '显示本机所有 IP 地址',
      long: '--all-ip-addresses'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-s'],
      note: 'macOS 自带 BSD hostname 没有 GNU 的 -f（显示 FQDN）和 -I（显示所有 IP）选项，查看本机 IP 可改用 ifconfig 或 ipconfig getifaddr en0。',
      source: 'BSD'
    }
  }
}

export default data
