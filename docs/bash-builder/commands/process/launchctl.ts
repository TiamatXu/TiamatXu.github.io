import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'launchctl',
  desc: 'macOS 服务管理工具（launchd 的命令行接口）',
  category: 'process',
  subcommands: [
    {
      name: 'load',
      desc: '加载并启动一个 launchd 任务描述文件',
      arguments: [
        {
          name: 'plist',
          type: 'file',
          required: true,
          desc: '.plist 任务描述文件路径'
        }
      ],
      options: [
        {
          flag: '-w',
          type: 'boolean',
          desc: '同时覆盖该任务的禁用状态',
          long: '--overrideDisabled'
        }
      ]
    },
    {
      name: 'unload',
      desc: '卸载并停止一个 launchd 任务',
      arguments: [
        {
          name: 'plist',
          type: 'file',
          required: true,
          desc: '.plist 任务描述文件路径'
        }
      ]
    },
    {
      name: 'start',
      desc: '启动一个已加载的任务',
      arguments: [
        {
          name: 'label',
          type: 'string',
          required: true,
          desc: '任务标签'
        }
      ]
    },
    {
      name: 'stop',
      desc: '停止一个正在运行的任务',
      arguments: [
        {
          name: 'label',
          type: 'string',
          required: true,
          desc: '任务标签'
        }
      ]
    },
    {
      name: 'list',
      desc: '列出当前已加载的任务',
      arguments: [
        {
          name: 'label',
          type: 'string',
          required: false,
          desc: '任务标签，省略则列出全部'
        }
      ]
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'launchd 是 macOS/Darwin 专属的初始化与服务管理系统，Linux 上没有对应命令，对应的是 systemd 及其 systemctl。'
    },
    centos: {
      supported: false,
      note: 'launchd 是 macOS/Darwin 专属的初始化与服务管理系统，Linux 上没有对应命令，对应的是 systemd 及其 systemctl。'
    },
    bsd: {
      supported: true,
      note: 'launchctl 是 macOS 管理开机自启、后台服务（守护进程/代理）的标准命令，与 Linux 上的 systemctl 地位相当，但配置方式（XML plist 文件）和概念模型完全不同。',
      source: 'BSD'
    }
  }
}

export default data
