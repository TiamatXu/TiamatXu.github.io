import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'timeout',
  desc: '在指定时间后向命令发送信号使其终止',
  category: 'process',
  arguments: [
    {
      name: 'duration',
      type: 'string',
      required: true,
      desc: '超时时长，如 10、5m'
    },
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '要执行的命令'
    }
  ],
  options: [
    {
      flag: '-s',
      type: 'string',
      desc: '超时后发送的信号（默认 SIGTERM）',
      long: '--signal'
    },
    {
      flag: '-k',
      type: 'string',
      desc: '在发送信号后再等待一段时间强制 SIGKILL',
      long: '--kill-after'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install coreutils',
      note: 'macOS 默认不自带 timeout 命令，需要通过 brew install coreutils 安装后以 gtimeout 使用（也可将 GNU 版本软链接为 timeout）。'
    }
  }
}

export default data
