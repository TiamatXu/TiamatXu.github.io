import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'go',
  desc: 'Go 语言官方工具链',
  category: 'package-runtime',
  subcommands: [
    {
      name: 'run',
      desc: '编译并直接运行 Go 源文件',
      arguments: [
        {
          name: 'file',
          type: 'file',
          required: true,
          desc: 'Go 源文件路径'
        }
      ]
    },
    {
      name: 'build',
      desc: '编译生成可执行文件',
      options: [
        {
          flag: '-o',
          type: 'string',
          desc: '指定输出的可执行文件名'
        }
      ]
    },
    {
      name: 'test',
      desc: '运行测试用例',
      options: [
        {
          flag: '-v',
          type: 'boolean',
          desc: '显示详细的测试过程'
        }
      ]
    },
    {
      name: 'get',
      desc: '下载并安装依赖包（较新版本更推荐用 go install）',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '包路径'
        }
      ]
    },
    {
      name: 'install',
      desc: '编译并安装可执行程序到 GOPATH/bin',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '包路径'
        }
      ]
    },
    {
      name: 'mod',
      desc: '管理模块依赖（go.mod）',
      options: [
        {
          flag: 'init',
          type: 'string',
          desc: '初始化一个新模块'
        },
        {
          flag: 'tidy',
          type: 'boolean',
          desc: '整理并同步依赖到 go.mod/go.sum'
        }
      ]
    },
    {
      name: 'fmt',
      desc: '按官方风格格式化代码'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'Go 工具链本身在 macOS 与 Linux 上均不预装，需要分别通过官网安装包/brew install go 或发行版包管理器安装；安装完成后命令行用法完全一致。',
      source: 'BSD'
    }
  }
}

export default data
