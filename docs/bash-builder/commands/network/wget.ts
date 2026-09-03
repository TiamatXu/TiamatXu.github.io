import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'wget',
  desc: '命令行文件下载工具',
  category: 'network',
  arguments: [
    {
      name: 'url',
      type: 'string',
      required: true,
      desc: '要下载的 URL'
    }
  ],
  options: [
    {
      flag: '-O',
      type: 'string',
      desc: '将下载内容保存为指定文件名',
      long: '--output-document'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '断点续传',
      long: '--continue'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '递归下载整个网站/目录',
      long: '--recursive'
    },
    {
      flag: '-np',
      type: 'boolean',
      desc: '递归下载时不追溯父目录',
      long: '--no-parent'
    },
    {
      flag: '-q',
      type: 'boolean',
      desc: '静默模式',
      long: '--quiet'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install wget',
      note: 'macOS 默认不自带 wget（只自带 curl），需要通过 Homebrew 自行安装；安装后命令行用法与 Linux 上的 GNU wget 完全一致。'
    }
  }
}

export default data
