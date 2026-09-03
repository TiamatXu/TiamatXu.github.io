import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ftp',
  desc: '传统 FTP 客户端',
  category: 'network',
  arguments: [
    {
      name: 'host',
      type: 'string',
      required: true,
      desc: '目标主机'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: '与 telnet 类似，出于安全考虑 Apple 自 macOS 10.13 High Sierra 起默认移除了 ftp 命令，可通过 brew install inetutils 或改用图形化/第三方 FTP 客户端、lftp 等替代。'
    }
  }
}

export default data
