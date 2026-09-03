import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'service',
  desc: '传统 SysV 风格的服务启动/停止管理命令',
  category: 'process',
  arguments: [
    {
      name: 'name',
      type: 'string',
      required: true,
      desc: '服务名称'
    },
    {
      name: 'action',
      type: 'string',
      required: true,
      desc: '如 start/stop/restart/status'
    }
  ],
  variants: {
    ubuntu: {
      supported: true,
      note: 'Ubuntu/Debian 在 systemd 之上保留了 service 命令作为兼容层。'
    },
    centos: {
      supported: true,
      note: 'CentOS 在 systemd 之上保留了 service 命令作为兼容层；CentOS 6 及更早版本则是原生的 SysV init 命令。'
    },
    bsd: {
      supported: false,
      note: 'macOS 不使用 SysV init 或 systemd，而是 launchd；管理服务请改用 launchctl load/unload/start/stop。'
    }
  }
}

export default data
