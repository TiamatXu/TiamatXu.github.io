import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'port',
  desc: 'MacPorts，macOS 上的另一款包管理器',
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
      name: 'outdated',
      desc: '列出可升级的已安装软件包'
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
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'MacPorts 是 macOS 专属包管理器，Linux 上无对应命令。'
    },
    centos: {
      supported: false,
      note: 'MacPorts 是 macOS 专属包管理器，Linux 上无对应命令。'
    },
    bsd: {
      supported: true,
      note: 'MacPorts 是 macOS 上历史悠久的包管理器，与 Homebrew 并存但生态规模较小，需要单独从官网安装，并非系统预装。',
      source: 'BSD'
    }
  }
}

export default data
