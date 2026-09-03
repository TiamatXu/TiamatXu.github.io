import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'snap',
  desc: 'Canonical 推出的跨发行版通用软件包（Snap）管理工具',
  category: 'package-management',
  subcommands: [
    {
      name: 'install',
      desc: '安装 snap 软件包',
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
          flag: '--classic',
          type: 'boolean',
          desc: '以传统权限模式安装（无沙盒限制）'
        }
      ]
    },
    {
      name: 'remove',
      desc: '卸载 snap 软件包',
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
      name: 'list',
      desc: '列出已安装的 snap 软件包'
    },
    {
      name: 'refresh',
      desc: '升级已安装的 snap 软件包',
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
      name: 'find',
      desc: '搜索可用的 snap 软件包',
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
      supported: true,
      note: 'Ubuntu 桌面版默认预装 snapd。'
    },
    centos: {
      supported: false,
      install: 'sudo yum install epel-release snapd',
      note: 'CentOS 默认不预装 snapd，需要先启用 EPEL 仓库再安装。'
    },
    bsd: {
      supported: false,
      note: 'snap 依赖 Linux 内核特性（如 squashfs、AppArmor），macOS 无法运行 snapd，也没有对应命令。'
    }
  }
}

export default data
