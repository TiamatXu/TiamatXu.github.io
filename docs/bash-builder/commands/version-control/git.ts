import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'git',
  desc: '分布式版本控制系统',
  category: 'version-control',
  subcommands: [
    {
      name: 'clone',
      desc: '克隆远程仓库到本地',
      arguments: [
        {
          name: 'repository',
          type: 'string',
          required: true,
          desc: '仓库地址（HTTPS/SSH）'
        },
        {
          name: 'directory',
          type: 'path',
          required: false,
          desc: '本地目标目录，省略则使用仓库名'
        }
      ],
      options: [
        {
          flag: '--depth',
          type: 'string',
          desc: '浅克隆，只获取最近 N 次提交历史'
        },
        {
          flag: '-b',
          type: 'string',
          desc: '克隆后直接切换到指定分支',
          long: '--branch'
        },
        {
          flag: '--recursive',
          type: 'boolean',
          desc: '同时递归克隆所有子模块'
        }
      ]
    },
    {
      name: 'init',
      desc: '在当前目录初始化一个新仓库',
      arguments: [
        {
          name: 'directory',
          type: 'path',
          required: false,
          desc: '要初始化的目录，省略则为当前目录'
        }
      ],
      options: [
        {
          flag: '--bare',
          type: 'boolean',
          desc: '创建没有工作区的裸仓库（常用于服务端）'
        }
      ]
    },
    {
      name: 'add',
      desc: '将文件改动加入暂存区',
      arguments: [
        {
          name: 'file',
          type: 'path',
          required: false,
          desc: '要加入暂存区的文件路径',
          multiple: true
        }
      ],
      options: [
        {
          flag: '-A',
          type: 'boolean',
          desc: '暂存所有改动（含新增/修改/删除）',
          long: '--all'
        },
        {
          flag: '-p',
          type: 'boolean',
          desc: '交互式地逐块选择要暂存的改动',
          long: '--patch'
        }
      ]
    },
    {
      name: 'commit',
      desc: '提交暂存区中的改动',
      options: [
        {
          flag: '-m',
          type: 'string',
          desc: '指定提交信息',
          long: '--message'
        },
        {
          flag: '-a',
          type: 'boolean',
          desc: '自动暂存所有已跟踪文件的改动后一并提交',
          long: '--all'
        },
        {
          flag: '--amend',
          type: 'boolean',
          desc: '修改上一次提交（而非新建一次提交）'
        }
      ]
    },
    {
      name: 'status',
      desc: '查看工作区与暂存区的当前状态',
      options: [
        {
          flag: '-s',
          type: 'boolean',
          desc: '以简洁格式显示',
          long: '--short'
        }
      ]
    },
    {
      name: 'diff',
      desc: '查看尚未提交的改动内容',
      options: [
        {
          flag: '--staged',
          type: 'boolean',
          desc: '只查看暂存区（已 add）的改动',
          long: '--cached'
        },
        {
          flag: '--stat',
          type: 'boolean',
          desc: '只显示改动文件的统计摘要，不显示具体内容'
        }
      ]
    },
    {
      name: 'log',
      desc: '查看提交历史',
      options: [
        {
          flag: '--oneline',
          type: 'boolean',
          desc: '每条提交显示为一行简洁摘要'
        },
        {
          flag: '-n',
          type: 'string',
          desc: '限制显示的提交条数'
        },
        {
          flag: '--graph',
          type: 'boolean',
          desc: '以 ASCII 图形方式显示分支合并结构'
        },
        {
          flag: '-p',
          type: 'boolean',
          desc: '显示每次提交的具体差异内容',
          long: '--patch'
        }
      ]
    },
    {
      name: 'branch',
      desc: '查看、创建或删除分支',
      arguments: [
        {
          name: 'branchname',
          type: 'string',
          required: false,
          desc: '要新建的分支名，省略则列出现有分支'
        }
      ],
      options: [
        {
          flag: '-a',
          type: 'boolean',
          desc: '列出所有分支（含远程跟踪分支）',
          long: '--all'
        },
        {
          flag: '-d',
          type: 'string',
          desc: '删除指定分支'
        },
        {
          flag: '-m',
          type: 'boolean',
          desc: '重命名当前分支',
          long: '--move'
        }
      ]
    },
    {
      name: 'checkout',
      desc: '切换分支或恢复工作区文件（多功能命令）',
      arguments: [
        {
          name: 'target',
          type: 'string',
          required: true,
          desc: '分支名 / 提交号 / 文件路径'
        }
      ],
      options: [
        {
          flag: '-b',
          type: 'string',
          desc: '创建并切换到新分支'
        }
      ]
    },
    {
      name: 'switch',
      desc: '切换分支（职责更单一，较新版本 Git 推荐使用）',
      arguments: [
        {
          name: 'branch',
          type: 'string',
          required: true,
          desc: '要切换到的分支名'
        }
      ],
      options: [
        {
          flag: '-c',
          type: 'string',
          desc: '创建并切换到新分支',
          long: '--create'
        }
      ]
    },
    {
      name: 'merge',
      desc: '将指定分支合并到当前分支',
      arguments: [
        {
          name: 'branch',
          type: 'string',
          required: true,
          desc: '要合并进来的分支名'
        }
      ],
      options: [
        {
          flag: '--no-ff',
          type: 'boolean',
          desc: '禁止快进合并，始终生成一个合并提交'
        },
        {
          flag: '--abort',
          type: 'boolean',
          desc: '中止一次发生冲突的合并，回到合并前状态'
        }
      ]
    },
    {
      name: 'rebase',
      desc: '将当前分支的提交重新应用到目标分支之上',
      arguments: [
        {
          name: 'branch',
          type: 'string',
          required: true,
          desc: '变基的目标基准分支'
        }
      ],
      options: [
        {
          flag: '-i',
          type: 'boolean',
          desc: '交互式变基，可编辑/合并/重排提交',
          long: '--interactive'
        },
        {
          flag: '--abort',
          type: 'boolean',
          desc: '中止变基，回到变基前状态'
        },
        {
          flag: '--continue',
          type: 'boolean',
          desc: '解决冲突后继续未完成的变基'
        }
      ]
    },
    {
      name: 'push',
      desc: '将本地提交推送到远程仓库',
      arguments: [
        {
          name: 'remote',
          type: 'string',
          required: false,
          desc: '远程仓库名，如 origin'
        },
        {
          name: 'branch',
          type: 'string',
          required: false,
          desc: '要推送的分支名'
        }
      ],
      options: [
        {
          flag: '-u',
          type: 'boolean',
          desc: '推送并设置为该分支的默认上游',
          long: '--set-upstream'
        },
        {
          flag: '-f',
          type: 'boolean',
          desc: '强制推送（覆盖远程历史，需谨慎）',
          long: '--force'
        },
        {
          flag: '--tags',
          type: 'boolean',
          desc: '同时推送所有标签'
        }
      ]
    },
    {
      name: 'pull',
      desc: '拉取远程分支并合并到当前分支',
      arguments: [
        {
          name: 'remote',
          type: 'string',
          required: false,
          desc: '远程仓库名，如 origin'
        },
        {
          name: 'branch',
          type: 'string',
          required: false,
          desc: '要拉取的分支名'
        }
      ],
      options: [
        {
          flag: '--rebase',
          type: 'boolean',
          desc: '用变基而非合并的方式整合远程改动'
        }
      ]
    },
    {
      name: 'fetch',
      desc: '从远程仓库获取更新但不自动合并',
      arguments: [
        {
          name: 'remote',
          type: 'string',
          required: false,
          desc: '远程仓库名，省略则获取所有已配置远程'
        }
      ],
      options: [
        {
          flag: '--all',
          type: 'boolean',
          desc: '获取所有已配置的远程仓库'
        },
        {
          flag: '--prune',
          type: 'boolean',
          desc: '同时清理远程已删除分支对应的本地跟踪引用'
        }
      ]
    },
    {
      name: 'remote',
      desc: '管理远程仓库地址',
      arguments: [
        {
          name: 'name',
          type: 'string',
          required: false,
          desc: '远程仓库名称，配合 add 使用'
        },
        {
          name: 'url',
          type: 'string',
          required: false,
          desc: '远程仓库地址，配合 add 使用'
        }
      ],
      options: [
        {
          flag: '-v',
          type: 'boolean',
          desc: '显示每个远程仓库的详细地址',
          long: '--verbose'
        },
        {
          flag: 'add',
          type: 'boolean',
          desc: '添加一个新的远程仓库'
        }
      ]
    },
    {
      name: 'stash',
      desc: '将工作区的未提交改动临时保存起来',
      options: [
        {
          flag: 'pop',
          type: 'boolean',
          desc: '恢复最近一次暂存的改动并删除该记录'
        },
        {
          flag: 'list',
          type: 'boolean',
          desc: '列出所有已保存的暂存记录'
        },
        {
          flag: 'drop',
          type: 'boolean',
          desc: '丢弃最近一次暂存记录'
        }
      ]
    },
    {
      name: 'reset',
      desc: '回退提交历史或暂存区状态',
      arguments: [
        {
          name: 'commit',
          type: 'string',
          required: false,
          desc: '要回退到的目标提交，省略则默认 HEAD'
        }
      ],
      options: [
        {
          flag: '--hard',
          type: 'boolean',
          desc: '同时丢弃工作区中的所有改动（不可恢复，需谨慎）'
        },
        {
          flag: '--soft',
          type: 'boolean',
          desc: '仅回退提交指针，暂存区与工作区改动都保留'
        },
        {
          flag: '--mixed',
          type: 'boolean',
          desc: '回退提交指针与暂存区，但保留工作区改动（默认行为）'
        }
      ]
    },
    {
      name: 'tag',
      desc: '创建、查看或删除标签',
      arguments: [
        {
          name: 'tagname',
          type: 'string',
          required: false,
          desc: '要创建的标签名，省略则列出现有标签'
        }
      ],
      options: [
        {
          flag: '-a',
          type: 'boolean',
          desc: '创建带附注信息的标签',
          long: '--annotate'
        },
        {
          flag: '-d',
          type: 'string',
          desc: '删除指定标签'
        }
      ]
    },
    {
      name: 'cherry-pick',
      desc: '挑选指定的某次提交应用到当前分支',
      arguments: [
        {
          name: 'commit',
          type: 'string',
          required: true,
          desc: '要挑选的提交号'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 上首次运行 git 会触发安装 Xcode 命令行工具（Command Line Tools），并非开箱自带完整版本；大多数 Linux 发行版同样默认不预装 git，需要 apt/yum install git。安装完成后各平台命令行用法完全一致。',
      source: 'BSD'
    }
  }
}

export default data
