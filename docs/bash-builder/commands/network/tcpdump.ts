import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tcpdump',
  desc: '命令行抓包/网络流量分析工具',
  category: 'network',
  options: [
    {
      flag: '-i',
      type: 'string',
      desc: '指定要监听的网络接口',
      long: '--interface'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '不进行域名解析，直接显示 IP',
      long: '--number'
    },
    {
      flag: '-w',
      type: 'string',
      desc: '将抓包结果写入文件（可用 Wireshark 打开）'
    },
    {
      flag: '-c',
      type: 'string',
      desc: '抓取指定数量的数据包后停止',
      long: '--count'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 默认预装 tcpdump，用法与 Linux 版本基本一致，运行时同样需要 root/sudo 权限；部分精简版 Linux 发行版（如某些容器基础镜像）不预装，需要 apt install tcpdump。',
      source: 'BSD'
    }
  }
}

export default data
