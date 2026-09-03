import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'cargo',
  desc: 'Rust 官方包管理与构建工具',
  category: 'package-runtime',
  subcommands: [
    {
      name: 'new',
      desc: '创建一个新的 Rust 项目',
      arguments: [
        {
          name: 'name',
          type: 'string',
          required: true,
          desc: '项目名称'
        }
      ]
    },
    {
      name: 'build',
      desc: '编译当前项目',
      options: [
        {
          flag: '--release',
          type: 'boolean',
          desc: '使用发布模式编译（开启优化）'
        }
      ]
    },
    {
      name: 'run',
      desc: '编译并运行当前项目'
    },
    {
      name: 'test',
      desc: '运行项目的测试用例'
    },
    {
      name: 'add',
      desc: '添加一个依赖 crate',
      arguments: [
        {
          name: 'crate',
          type: 'string',
          required: true,
          desc: '要添加的 crate 名称'
        }
      ]
    },
    {
      name: 'install',
      desc: '编译并安装一个可执行的 crate',
      arguments: [
        {
          name: 'crate',
          type: 'string',
          required: true,
          desc: '要安装的 crate 名称'
        }
      ]
    },
    {
      name: 'publish',
      desc: '将当前 crate 发布到 crates.io'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'curl https://sh.rustup.rs -sSf | sh',
      note: 'cargo 随 Rust 工具链（通过 rustup）一同安装，macOS 与 Linux 均不预装，安装方式和命令行用法在两个平台上完全一致。'
    }
  }
}

export default data
