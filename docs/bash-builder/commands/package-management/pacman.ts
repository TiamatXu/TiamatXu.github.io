import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'pacman',
  desc: 'Arch Linux 系发行版包管理工具',
  category: 'package-management',
  subcommands: [
    {
      name: '-S',
      desc: '安装软件包（sync）',
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
          desc: '安装前刷新软件包数据库'
        },
        {
          flag: '-u',
          type: 'boolean',
          desc: '安装前先升级全部系统'
        }
      ]
    },
    {
      name: '-R',
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
          flag: '-s',
          type: 'boolean',
          desc: '同时删除不再需要的依赖'
        }
      ]
    },
    {
      name: '-Ss',
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
      name: '-Q',
      desc: '查询本地已安装的软件包',
      options: [
        {
          flag: '-i',
          type: 'boolean',
          desc: '显示软件包的详细信息'
        }
      ]
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'Debian/Ubuntu 系发行版使用 apt/apt-get，无 pacman 命令。'
    },
    centos: {
      supported: false,
      note: 'CentOS/RHEL 系发行版使用 yum/dnf，无 pacman 命令。'
    },
    bsd: {
      supported: false,
      note: 'pacman 是 Arch Linux 系专属包管理器，macOS 无此命令，可使用 Homebrew（brew）替代。'
    }
  }
}

export default data
