import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'dpkg',
  desc: 'Debian 系底层软件包安装/查询工具（.deb 包）',
  category: 'package-management',
  subcommands: [
    {
      name: '-i',
      desc: '安装本地 .deb 软件包文件',
      arguments: [
        {
          name: 'file',
          type: 'file',
          required: true,
          desc: '.deb 文件路径'
        }
      ]
    },
    {
      name: '-r',
      desc: '卸载软件包（保留配置文件）',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '软件包名称'
        }
      ]
    },
    {
      name: '-l',
      desc: '列出已安装的软件包'
    },
    {
      name: '-L',
      desc: '列出指定软件包安装的文件列表',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '软件包名称'
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
      note: 'CentOS/RHEL 系发行版使用 rpm/yum/dnf，不支持 .deb 包与 dpkg。'
    },
    bsd: {
      supported: false,
      note: 'dpkg 是 Debian 系专属的底层包管理工具，macOS 无此命令，可使用 Homebrew（brew）替代。'
    }
  }
}

export default data
