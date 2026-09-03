import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'dos2unix',
  desc: '将 Windows（CRLF）换行符转换为 Unix（LF）换行符',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要转换的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-k',
      type: 'boolean',
      desc: '保留原文件的时间戳',
      long: '--keepdate'
    },
    {
      flag: '-n',
      type: 'string',
      desc: '转换后写入新文件而不修改原文件',
      long: '--newfile'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install dos2unix',
      note: 'macOS 与大多数 Linux 发行版都不预装 dos2unix（及其反向工具 unix2dos），需要分别通过 brew install dos2unix 或 apt/yum install dos2unix 安装；也可用两边都自带的 sed -i \'s/\\r$//\' file 之类的命令一次性替代（但要注意 sed -i 在 macOS 上的参数写法差异）。'
    }
  }
}

export default data
