import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'dnf',
  desc: 'Fedora/RHEL 8+ 系发行版包管理工具（yum 的继任者）',
  category: 'package-management',
  subcommands: [
    {
      name: 'install',
      desc: '安装软件包',
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
          flag: '-y',
          type: 'boolean',
          desc: '自动确认所有提示',
          long: '--yes'
        }
      ]
    },
    {
      name: 'remove',
      desc: '卸载软件包',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '要卸载的软件包名称',
          multiple: true
        }
      ],
      options: [
        {
          flag: '-y',
          type: 'boolean',
          desc: '自动确认所有提示',
          long: '--yes'
        }
      ]
    },
    {
      name: 'upgrade',
      desc: '升级已安装的软件包',
      options: [
        {
          flag: '-y',
          type: 'boolean',
          desc: '自动确认所有提示',
          long: '--yes'
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
      desc: '列出软件包',
      options: [
        {
          flag: '--installed',
          type: 'boolean',
          desc: '只列出已安装的软件包'
        }
      ]
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'Debian/Ubuntu 系发行版使用 apt/apt-get，无 dnf 命令。'
    },
    centos: {
      supported: true,
      note: 'CentOS 8/RHEL 8 及之后版本的默认包管理器；更早版本（CentOS 7 及之前）请使用 yum。'
    },
    bsd: {
      supported: false,
      note: 'dnf 是 Fedora/RHEL 系发行版专属包管理器，macOS 无此命令，可使用 Homebrew（brew）替代。'
    }
  }
}

export default data
