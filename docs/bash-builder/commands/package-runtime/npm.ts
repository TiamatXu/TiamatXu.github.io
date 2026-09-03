import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'npm',
  desc: 'Node.js 官方包管理器',
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
          desc: '要安装的包名，省略则安装 package.json 中的全部依赖',
          multiple: true
        }
      ],
      options: [
        {
          flag: '-g',
          type: 'boolean',
          desc: '全局安装',
          long: '--global'
        },
        {
          flag: '-D',
          type: 'boolean',
          desc: '作为开发依赖保存',
          long: '--save-dev'
        },
        {
          flag: '--save-exact',
          type: 'boolean',
          desc: '锁定精确版本号而非语义化范围'
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
      name: 'run',
      desc: '执行 package.json 中 scripts 字段定义的脚本',
      arguments: [
        {
          name: 'script',
          type: 'string',
          required: true,
          desc: '脚本名称，如 build/test/dev'
        }
      ]
    },
    {
      name: 'init',
      desc: '交互式生成 package.json',
      options: [
        {
          flag: '-y',
          type: 'boolean',
          desc: '使用默认值快速生成，不进行交互提问',
          long: '--yes'
        }
      ]
    },
    {
      name: 'publish',
      desc: '将包发布到 npm 仓库',
      options: [
        {
          flag: '--access',
          type: 'string',
          desc: '发布可见性，如 public（scoped 包需要）'
        }
      ]
    },
    {
      name: 'update',
      desc: '升级依赖包到符合语义化版本范围的最新版',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: false,
          desc: '指定升级的包名，省略则升级全部'
        }
      ]
    },
    {
      name: 'ci',
      desc: '基于 package-lock.json 进行纯净、可复现安装（常用于 CI 环境）'
    },
    {
      name: 'list',
      desc: '列出已安装的依赖树',
      options: [
        {
          flag: '-g',
          type: 'boolean',
          desc: '列出全局安装的包',
          long: '--global'
        },
        {
          flag: '--depth',
          type: 'string',
          desc: '限制依赖树展示深度'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'npm 随 Node.js 一同安装，并非 macOS 或任意 Linux 发行版的系统自带组件，需要先安装 Node.js（官网安装包、nvm、brew install node 或 apt install nodejs 均可），安装后 npm 命令行用法在各平台完全一致。'
    }
  }
}

export default data
