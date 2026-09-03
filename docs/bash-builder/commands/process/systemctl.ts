import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'systemctl',
  desc: '控制 systemd 管理的服务/单元',
  category: 'process',
  subcommands: [
    {
      name: 'start',
      desc: '启动指定服务',
      arguments: [
        {
          name: 'unit',
          type: 'string',
          required: true,
          desc: '服务/单元名称'
        }
      ]
    },
    {
      name: 'stop',
      desc: '停止指定服务',
      arguments: [
        {
          name: 'unit',
          type: 'string',
          required: true,
          desc: '服务/单元名称'
        }
      ]
    },
    {
      name: 'restart',
      desc: '重启指定服务',
      arguments: [
        {
          name: 'unit',
          type: 'string',
          required: true,
          desc: '服务/单元名称'
        }
      ]
    },
    {
      name: 'status',
      desc: '查看指定服务的运行状态',
      arguments: [
        {
          name: 'unit',
          type: 'string',
          required: true,
          desc: '服务/单元名称'
        }
      ]
    },
    {
      name: 'enable',
      desc: '设置服务开机自启',
      arguments: [
        {
          name: 'unit',
          type: 'string',
          required: true,
          desc: '服务/单元名称'
        }
      ],
      options: [
        {
          flag: '--now',
          type: 'boolean',
          desc: '启用的同时立即启动服务'
        }
      ]
    },
    {
      name: 'disable',
      desc: '取消服务开机自启',
      arguments: [
        {
          name: 'unit',
          type: 'string',
          required: true,
          desc: '服务/单元名称'
        }
      ]
    }
  ],
  variants: {
    ubuntu: {
      supported: true,
      note: 'Ubuntu 15.04 及之后版本默认使用 systemd。'
    },
    centos: {
      supported: true,
      note: 'CentOS 7 及之后版本默认使用 systemd；CentOS 6 及更早版本使用 SysV init 的 service 命令。'
    },
    bsd: {
      supported: false,
      note: 'systemd 是 Linux 专属的初始化系统，macOS 使用完全不同的 launchd 机制，管理服务需改用 launchctl load/unload/start/stop 等命令。'
    }
  }
}

export default data
