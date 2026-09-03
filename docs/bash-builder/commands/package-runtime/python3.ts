import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'python3',
  desc: 'Python 3 解释器',
  category: 'package-runtime',
  arguments: [
    {
      name: 'script',
      type: 'file',
      required: false,
      desc: '要执行的脚本文件，省略则进入交互式解释器'
    }
  ],
  options: [
    {
      flag: '-m',
      type: 'string',
      desc: '以模块方式运行（如 python3 -m http.server）'
    },
    {
      flag: '-c',
      type: 'string',
      desc: '直接执行一行代码字符串'
    },
    {
      flag: '-V',
      type: 'boolean',
      desc: '显示 Python 版本号',
      long: '--version'
    },
    {
      flag: '-i',
      type: 'boolean',
      desc: '脚本执行完毕后保持进入交互模式'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: '较新版本 macOS 已不再稳定预装完整的系统级 Python（历史上的 /usr/bin/python2 已被彻底移除），不应依赖系统自带版本做开发，推荐通过官网安装包、pyenv 或 brew install python 管理；多数主流 Linux 发行版仍默认预装 python3。',
      source: 'BSD'
    }
  }
}

export default data
