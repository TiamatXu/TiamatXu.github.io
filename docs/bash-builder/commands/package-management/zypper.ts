import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'zypper',
  desc: 'openSUSE/SLES 系发行版包管理工具',
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
      name: 'update',
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
      name: 'refresh',
      desc: '刷新软件源'
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'Debian/Ubuntu 系发行版使用 apt/apt-get，无 zypper 命令。'
    },
    centos: {
      supported: false,
      note: 'CentOS/RHEL 系发行版使用 yum/dnf，无 zypper 命令。'
    },
    bsd: {
      supported: false,
      note: 'zypper 是 openSUSE/SLES 系专属包管理器，macOS 无此命令，可使用 Homebrew（brew）替代。'
    }
  }
}

export default data
