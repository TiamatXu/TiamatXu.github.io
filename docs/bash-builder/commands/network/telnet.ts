import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'telnet',
  desc: '远程登录/端口连通性测试工具',
  category: 'network',
  arguments: [
    {
      name: 'host',
      type: 'string',
      required: true,
      desc: '目标主机名或 IP'
    },
    {
      name: 'port',
      type: 'number',
      required: false,
      desc: '目标端口'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install telnet',
      note: '出于安全考虑，Apple 自 macOS 10.13 High Sierra 起默认移除了 telnet，需要通过 Homebrew 自行安装。'
    }
  }
}

export default data
