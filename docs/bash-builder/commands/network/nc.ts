import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'nc',
  desc: '网络工具瑞士军刀（netcat），用于端口连接/监听/传输',
  category: 'network',
  arguments: [
    {
      name: 'host',
      type: 'string',
      required: false,
      desc: '目标主机名或 IP'
    },
    {
      name: 'port',
      type: 'number',
      required: false,
      desc: '目标端口'
    }
  ],
  options: [
    {
      flag: '-l',
      type: 'boolean',
      desc: '监听模式',
      long: '--listen'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示详细信息',
      long: '--verbose'
    },
    {
      flag: '-u',
      type: 'boolean',
      desc: '使用 UDP 而非 TCP',
      long: '--udp'
    },
    {
      flag: '-z',
      type: 'boolean',
      desc: '仅扫描端口是否开放，不发送数据',
      long: '--zero'
    },
    {
      flag: '-w',
      type: 'string',
      desc: '设置超时时间（秒）'
    },
    {
      flag: '-e',
      type: 'string',
      desc: '连接建立后执行指定程序（危险选项）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-l', '-v', '-u', '-z', '-w'],
      note: 'macOS 自带的是 BSD netcat，出于安全考虑并未编译 -e（连接后执行程序）这个选项，而部分 Linux 发行版的 GNU netcat-traditional 支持 -e；跨平台脚本不应依赖 -e。',
      source: 'BSD'
    }
  }
}

export default data
