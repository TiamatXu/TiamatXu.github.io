import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'apk',
  desc: 'Alpine Linux 的包管理工具',
  category: 'package-management',
  subcommands: [
    {
      name: 'add',
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
      name: 'del',
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
      name: 'update',
      desc: '刷新软件包索引'
    },
    {
      name: 'upgrade',
      desc: '升级已安装的软件包'
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
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'apk 是 Alpine Linux 专属包管理器，与 Debian/Ubuntu 系发行版无关。'
    },
    centos: {
      supported: false,
      note: 'apk 是 Alpine Linux 专属包管理器，与 RHEL/CentOS 系发行版无关。'
    },
    bsd: {
      supported: false,
      note: 'apk 是 Alpine Linux 专属包管理器，macOS 无此命令，可使用 Homebrew（brew）替代（注意与 Android 的 .apk 安装包是完全不同的概念）。'
    }
  }
}

export default data
