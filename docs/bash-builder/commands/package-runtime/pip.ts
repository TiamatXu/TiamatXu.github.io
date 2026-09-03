import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'pip',
  desc: 'Python 官方包管理器（pip3 为其 Python 3 版本别名）',
  category: 'package-runtime',
  subcommands: [
    {
      name: 'install',
      desc: '安装依赖包',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: false,
          desc: '要安装的包名',
          multiple: true
        }
      ],
      options: [
        {
          flag: '-r',
          type: 'string',
          desc: '从 requirements.txt 批量安装',
          long: '--requirement'
        },
        {
          flag: '-U',
          type: 'boolean',
          desc: '升级到最新版本',
          long: '--upgrade'
        },
        {
          flag: '--user',
          type: 'boolean',
          desc: '安装到当前用户目录而非系统目录'
        }
      ]
    },
    {
      name: 'uninstall',
      desc: '卸载依赖包',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '要卸载的包名'
        }
      ]
    },
    {
      name: 'list',
      desc: '列出当前环境已安装的包',
      options: [
        {
          flag: '--outdated',
          type: 'boolean',
          desc: '只列出有更新版本可用的包'
        }
      ]
    },
    {
      name: 'freeze',
      desc: '以 requirements.txt 格式输出当前环境已安装的包及版本'
    },
    {
      name: 'show',
      desc: '查看指定包的详细信息',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '包名'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: '近年 macOS 已逐步移除系统自带的 Python（2 已彻底移除，3 是否预装/预装到什么程度也因系统版本而异），苹果并不建议依赖系统自带 Python 做开发，推荐通过官网安装包、pyenv 或 brew install python 自行安装；多数 Linux 发行版默认预装 python3 但 pip 往往需要额外 apt install python3-pip。',
      source: 'BSD'
    }
  }
}

export default data
