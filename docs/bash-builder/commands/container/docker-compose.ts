import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'docker-compose',
  desc: '通过 YAML 文件定义并管理多容器应用',
  category: 'container',
  subcommands: [
    {
      name: 'up',
      desc: '创建并启动 compose 文件中定义的所有服务',
      options: [
        {
          flag: '-d',
          type: 'boolean',
          desc: '后台运行',
          long: '--detach'
        },
        {
          flag: '--build',
          type: 'boolean',
          desc: '启动前重新构建镜像'
        }
      ]
    },
    {
      name: 'down',
      desc: '停止并删除服务、网络等资源',
      options: [
        {
          flag: '-v',
          type: 'boolean',
          desc: '同时删除数据卷',
          long: '--volumes'
        }
      ]
    },
    {
      name: 'build',
      desc: '构建/重新构建服务对应的镜像'
    },
    {
      name: 'logs',
      desc: '查看服务日志',
      options: [
        {
          flag: '-f',
          type: 'boolean',
          desc: '持续跟踪输出',
          long: '--follow'
        }
      ]
    },
    {
      name: 'ps',
      desc: '列出 compose 管理的容器'
    },
    {
      name: 'restart',
      desc: '重启指定服务',
      arguments: [
        {
          name: 'service',
          type: 'string',
          required: false,
          desc: '服务名称'
        }
      ]
    },
    {
      name: 'exec',
      desc: '在指定服务的容器内执行命令',
      arguments: [
        {
          name: 'service',
          type: 'string',
          required: true,
          desc: '服务名称'
        },
        {
          name: 'command',
          type: 'string',
          required: true,
          desc: '要执行的命令'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: '较新版本 Docker 已将 compose 功能内置为 docker compose（无连字符）子命令，官方逐步弃用独立的 docker-compose 二进制；两种写法命令语义基本一致。无论哪种形式，都随 Docker 一起安装，本身并非系统预装。'
    }
  }
}

export default data
