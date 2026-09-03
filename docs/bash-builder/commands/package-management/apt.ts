import type { CommandData } from '@theme/bash/types'

const apt: CommandData = {
  name: 'apt',
  desc: 'Debian/Ubuntu 系发行版的包管理工具',
  category: 'package-management',

  subcommands: [
    {
      name: 'install',
      desc: '安装软件包',
      arguments: [
        { name: 'package', type: 'string', required: true, multiple: true, desc: '要安装的软件包名称' }
      ],
      options: [
        { flag: '-y', long: '--yes', type: 'boolean', desc: '自动确认所有提示' },
        { flag: '-s', long: '--simulate', type: 'boolean', desc: '模拟运行，不实际执行' },
        { flag: '-f', long: '--fix-broken', type: 'boolean', desc: '尝试修复依赖问题' }
      ]
    },
    {
      name: 'remove',
      desc: '卸载软件包（保留配置文件）',
      arguments: [
        { name: 'package', type: 'string', required: true, multiple: true, desc: '要卸载的软件包名称' }
      ],
      options: [
        { flag: '-y', long: '--yes', type: 'boolean', desc: '自动确认所有提示' },
        { flag: '--purge', type: 'boolean', desc: '连带配置文件一并删除' }
      ]
    },
    {
      name: 'update',
      desc: '刷新软件包索引',
      options: [
        { flag: '-y', long: '--yes', type: 'boolean', desc: '自动确认所有提示' }
      ]
    },
    {
      name: 'upgrade',
      desc: '升级已安装的软件包',
      options: [
        { flag: '-y', long: '--yes', type: 'boolean', desc: '自动确认所有提示' }
      ]
    },
    {
      name: 'search',
      desc: '搜索软件包',
      arguments: [
        { name: 'keyword', type: 'string', required: true, desc: '搜索关键字' }
      ]
    },
    {
      name: 'list',
      desc: '列出软件包',
      options: [
        { flag: '--installed', type: 'boolean', desc: '只列出已安装的软件包' }
      ]
    },
    {
      name: 'autoremove',
      desc: '删除不再需要的依赖包',
      options: [
        { flag: '-y', long: '--yes', type: 'boolean', desc: '自动确认所有提示' }
      ]
    }
  ],

  variants: {
    ubuntu: { supported: true },
    centos: {
      supported: false,
      note: 'CentOS/RHEL 系发行版使用 yum 或 dnf，无 apt 命令。'
    },
    bsd: {
      supported: false,
      note: 'APT 是 Debian/Ubuntu 系发行版专属包管理器，macOS 无此命令，可使用 Homebrew（brew）替代。'
    }
  }
}

export default apt
