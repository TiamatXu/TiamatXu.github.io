import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'helm',
  desc: 'Kubernetes 的包管理器（以 Chart 形式打包应用）',
  category: 'container',
  subcommands: [
    {
      name: 'install',
      desc: '安装一个 Chart 为新的 Release',
      arguments: [
        {
          name: 'release',
          type: 'string',
          required: true,
          desc: 'Release 名称'
        },
        {
          name: 'chart',
          type: 'string',
          required: true,
          desc: 'Chart 名称或路径'
        }
      ]
    },
    {
      name: 'upgrade',
      desc: '升级一个已存在的 Release',
      arguments: [
        {
          name: 'release',
          type: 'string',
          required: true,
          desc: 'Release 名称'
        },
        {
          name: 'chart',
          type: 'string',
          required: true,
          desc: 'Chart 名称或路径'
        }
      ],
      options: [
        {
          flag: '--install',
          type: 'boolean',
          desc: '若 Release 不存在则改为安装'
        }
      ]
    },
    {
      name: 'uninstall',
      desc: '卸载一个 Release',
      arguments: [
        {
          name: 'release',
          type: 'string',
          required: true,
          desc: 'Release 名称'
        }
      ]
    },
    {
      name: 'list',
      desc: '列出当前命名空间下的所有 Release'
    },
    {
      name: 'repo',
      desc: '管理 Chart 仓库',
      options: [
        {
          flag: 'add',
          type: 'string',
          desc: '添加一个 Chart 仓库'
        },
        {
          flag: 'update',
          type: 'boolean',
          desc: '刷新已添加仓库的索引'
        }
      ]
    },
    {
      name: 'search',
      desc: '搜索可用的 Chart',
      arguments: [
        {
          name: 'keyword',
          type: 'string',
          required: true,
          desc: '搜索关键字'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install helm',
      note: 'helm 同样是跨平台一致的静态二进制客户端，两边都不预装，需要分别通过 brew install helm 或对应包管理器/官方脚本安装。'
    }
  }
}

export default data
