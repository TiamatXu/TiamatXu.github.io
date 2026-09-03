import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'yarn',
  desc: 'Facebook 推出的 Node.js 包管理器',
  category: 'package-runtime',
  subcommands: [
    {
      name: 'add',
      desc: '添加一个依赖包',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '要添加的包名',
          multiple: true
        }
      ],
      options: [
        {
          flag: '-D',
          type: 'boolean',
          desc: '作为开发依赖保存',
          long: '--dev'
        }
      ]
    },
    {
      name: 'remove',
      desc: '移除一个依赖包',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: true,
          desc: '要移除的包名'
        }
      ]
    },
    {
      name: 'install',
      desc: '安装 package.json 中声明的全部依赖（也可直接省略为 yarn）'
    },
    {
      name: 'run',
      desc: '执行 package.json 中 scripts 字段定义的脚本',
      arguments: [
        {
          name: 'script',
          type: 'string',
          required: true,
          desc: '脚本名称'
        }
      ]
    },
    {
      name: 'upgrade',
      desc: '升级依赖包到最新版本',
      arguments: [
        {
          name: 'package',
          type: 'string',
          required: false,
          desc: '指定升级的包名，省略则升级全部'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'yarn 同样依赖 Node.js 运行环境，两个平台都不预装，需要先安装 Node.js 后再 npm install -g yarn 或 brew install yarn 安装。'
    }
  }
}

export default data
