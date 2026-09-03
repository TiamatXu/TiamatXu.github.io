import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'apt-get',
  desc: 'Debian/Ubuntu 系发行版包管理工具（apt 的底层/旧接口）',
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
        },
        {
          flag: '-f',
          type: 'boolean',
          desc: '尝试修复依赖问题',
          long: '--fix-broken'
        }
      ]
    },
    {
      name: 'remove',
      desc: '卸载软件包（保留配置文件）',
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
        },
        {
          flag: '--purge',
          type: 'boolean',
          desc: '连带配置文件一并删除'
        }
      ]
    },
    {
      name: 'update',
      desc: '刷新软件包索引',
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
      name: 'autoremove',
      desc: '删除不再需要的依赖包',
      options: [
        {
          flag: '-y',
          type: 'boolean',
          desc: '自动确认所有提示',
          long: '--yes'
        }
      ]
    }
  ],
  variants: {
    ubuntu: {
      supported: true
    },
    centos: {
      supported: false,
      note: 'CentOS/RHEL 系发行版使用 yum 或 dnf，无 apt-get 命令。'
    },
    bsd: {
      supported: false,
      note: 'apt-get 是 Debian/Ubuntu 系发行版专属包管理器，macOS 无此命令，可使用 Homebrew（brew）替代。'
    }
  }
}

export default data
