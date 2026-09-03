import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'node',
  desc: 'Node.js JavaScript 运行时',
  category: 'package-runtime',
  arguments: [
    {
      name: 'script',
      type: 'file',
      required: false,
      desc: '要执行的 JS 文件，省略则进入交互式 REPL'
    }
  ],
  options: [
    {
      flag: '-e',
      type: 'string',
      desc: '直接执行一行代码字符串',
      long: '--eval'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示 Node.js 版本号',
      long: '--version'
    },
    {
      flag: '-c',
      type: 'boolean',
      desc: '只检查脚本语法，不实际执行',
      long: '--check'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'Node.js 在 macOS 与任意 Linux 发行版上均不预装，需要通过官网安装包、nvm、brew install node 或 apt install nodejs 自行安装；安装后命令行用法完全一致。'
    }
  }
}

export default data
