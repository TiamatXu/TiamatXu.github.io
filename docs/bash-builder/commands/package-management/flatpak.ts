import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'flatpak',
  desc: '跨发行版沙盒化应用分发格式管理工具',
  category: 'package-management',
  subcommands: [
    {
      name: 'install',
      desc: '安装 flatpak 应用',
      arguments: [
        {
          name: 'remote',
          type: 'string',
          required: false,
          desc: '远程仓库名，如 flathub'
        },
        {
          name: 'app',
          type: 'string',
          required: true,
          desc: '应用 ID'
        }
      ]
    },
    {
      name: 'uninstall',
      desc: '卸载 flatpak 应用',
      arguments: [
        {
          name: 'app',
          type: 'string',
          required: true,
          desc: '应用 ID'
        }
      ]
    },
    {
      name: 'list',
      desc: '列出已安装的 flatpak 应用'
    },
    {
      name: 'update',
      desc: '升级已安装的 flatpak 应用'
    },
    {
      name: 'search',
      desc: '搜索可用的 flatpak 应用',
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
    ubuntu: {
      supported: false,
      install: 'sudo apt install flatpak',
      note: '标准 Ubuntu 默认不预装 flatpak，需要手动安装（部分衍生版如 Linux Mint 默认预装）。'
    },
    centos: {
      supported: true,
      note: 'Fedora/RHEL 系发行版对 flatpak 支持和集成度较高，部分版本默认预装。'
    },
    bsd: {
      supported: false,
      note: 'flatpak 依赖 Linux 内核的命名空间/cgroups 等沙盒机制，macOS 无法运行，也没有对应命令。'
    }
  }
}

export default data
