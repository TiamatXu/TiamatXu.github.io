import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'brew',
  desc: 'Homebrew，macOS（及 Linuxbrew）上最主流的包管理器',
  category: 'package-management',
  subcommands: [
    {
      name: 'install',
      desc: '安装软件包（Formula）或 GUI 应用（Cask）',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '要安装的软件包名称',
          multiple: true
        }
      ],
      options: [
        {
          flag: '--cask',
          type: 'boolean',
          desc: '安装图形界面应用（Cask）'
        }
      ]
    },
    {
      name: 'uninstall',
      desc: '卸载软件包',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '要卸载的软件包名称',
          multiple: true
        }
      ]
    },
    {
      name: 'update',
      desc: '更新 Homebrew 自身及软件包索引'
    },
    {
      name: 'upgrade',
      desc: '升级已安装的软件包',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: false,
          desc: '指定升级的软件包，省略则升级全部'
        }
      ]
    },
    {
      name: 'search',
      desc: '搜索软件包',
      arguments: [
        {
          name: 'keyword',
          type: 'string',
          required: true,
          desc: '搜索关键字'
        }
      ]
    },
    {
      name: 'list',
      desc: '列出已安装的软件包'
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'Ubuntu 默认使用 apt，如需 Homebrew 需要通过 Linuxbrew 方式单独安装，并非系统自带。'
    },
    centos: {
      supported: false,
      note: 'CentOS 默认使用 yum/dnf，如需 Homebrew 需要通过 Linuxbrew 方式单独安装，并非系统自带。'
    },
    bsd: {
      supported: true,
      note: 'Homebrew 是 macOS 上最主流的第三方包管理器，虽非系统预装，但已是事实上的 macOS 标准工具；同样的项目也提供 Linuxbrew 供 Linux 使用。',
      source: 'BSD'
    }
  }
}

export default data
