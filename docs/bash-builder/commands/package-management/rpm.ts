import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'rpm',
  desc: 'RPM 软件包底层安装/查询工具',
  category: 'package-management',
  subcommands: [
    {
      name: '-i',
      desc: '安装 .rpm 软件包文件',
      arguments: [
        {
          name: 'file',
          type: 'file',
          required: true,
          desc: '.rpm 文件路径'
        }
      ]
    },
    {
      name: '-e',
      desc: '卸载软件包',
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
      name: '-q',
      desc: '查询软件包是否已安装',
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
      name: '-qa',
      desc: '列出所有已安装的软件包'
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'Debian/Ubuntu 系发行版使用 .deb 包与 dpkg，不支持 rpm 格式。'
    },
    centos: {
      supported: true
    },
    bsd: {
      supported: false,
      note: 'rpm 是 RPM 系发行版专属的底层包管理工具，macOS 无此命令。'
    }
  }
}

export default data
