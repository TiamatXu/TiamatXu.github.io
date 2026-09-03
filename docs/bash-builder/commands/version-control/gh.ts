import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'gh',
  desc: 'GitHub 官方命令行工具',
  category: 'version-control',
  subcommands: [
    {
      name: 'auth',
      desc: '登录/查看 GitHub 账号认证状态',
      options: [
        {
          flag: 'login',
          type: 'boolean',
          desc: '登录 GitHub 账号'
        },
        {
          flag: 'status',
          type: 'boolean',
          desc: '查看当前认证状态'
        }
      ]
    },
    {
      name: 'repo',
      desc: '仓库相关操作',
      arguments: [
        {
          name: 'target',
          type: 'string',
          required: false,
          desc: '子操作对象，如 clone/create/view'
        }
      ],
      options: [
        {
          flag: 'clone',
          type: 'string',
          desc: '克隆一个仓库'
        },
        {
          flag: 'create',
          type: 'string',
          desc: '创建一个新仓库'
        },
        {
          flag: 'view',
          type: 'boolean',
          desc: '在浏览器/终端查看仓库信息'
        }
      ]
    },
    {
      name: 'pr',
      desc: 'Pull Request 相关操作',
      options: [
        {
          flag: 'create',
          type: 'boolean',
          desc: '创建一个新的 PR'
        },
        {
          flag: 'list',
          type: 'boolean',
          desc: '列出仓库的 PR'
        },
        {
          flag: 'checkout',
          type: 'string',
          desc: '将指定 PR 检出到本地分支'
        },
        {
          flag: 'merge',
          type: 'string',
          desc: '合并指定 PR'
        }
      ]
    },
    {
      name: 'issue',
      desc: 'Issue 相关操作',
      options: [
        {
          flag: 'create',
          type: 'boolean',
          desc: '创建一个新的 Issue'
        },
        {
          flag: 'list',
          type: 'boolean',
          desc: '列出仓库的 Issue'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install gh',
      note: 'gh 在 macOS 与大多数 Linux 发行版上均不预装，需要分别通过 brew install gh 或添加官方 apt 仓库后 apt install gh 安装。'
    }
  }
}

export default data
