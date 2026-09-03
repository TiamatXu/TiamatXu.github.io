import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'unrar',
  desc: '解压 RAR 格式压缩包',
  category: 'archive',
  arguments: [
    {
      name: 'archive',
      type: 'file',
      required: true,
      desc: '要解压的 .rar 文件'
    }
  ],
  options: [
    {
      flag: 'x',
      type: 'boolean',
      desc: '解压并保留原始目录结构'
    },
    {
      flag: 'l',
      type: 'boolean',
      desc: '仅列出压缩包内容，不解压'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install unrar',
      note: 'macOS 与大多数 Linux 发行版都不预装 unrar，需要分别通过 brew install unrar 或 apt/yum install unrar 安装；创建 .rar 压缩包所需的 rar 工具则是闭源共享软件，通常需单独下载官方版本。'
    }
  }
}

export default data
