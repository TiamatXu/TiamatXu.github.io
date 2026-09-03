import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: '7z',
  desc: '高压缩率的 7-Zip 归档工具（p7zip）',
  category: 'archive',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '子命令，如 a（添加）/x（解压）/l（列表）'
    },
    {
      name: 'archive',
      type: 'file',
      required: true,
      desc: '归档文件路径'
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'string',
      desc: '设置/输入解压密码'
    },
    {
      flag: '-o',
      type: 'string',
      desc: '指定解压输出目录'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install p7zip',
      note: '7z 在 macOS 与大多数 Linux 发行版上均不预装，需要分别通过 brew install p7zip 或 apt/yum install p7zip-full 安装。'
    }
  }
}

export default data
