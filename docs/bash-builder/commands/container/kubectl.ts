import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'kubectl',
  desc: 'Kubernetes 集群命令行管理工具',
  category: 'container',
  subcommands: [
    {
      name: 'get',
      desc: '查看指定类型的资源列表',
      arguments: [
        {
          name: 'resource',
          type: 'string',
          required: true,
          desc: '资源类型，如 pods/deployments/services'
        },
        {
          name: 'name',
          type: 'string',
          required: false,
          desc: '资源名称，省略则列出全部'
        }
      ],
      options: [
        {
          flag: '-n',
          type: 'string',
          desc: '指定命名空间',
          long: '--namespace'
        },
        {
          flag: '-o',
          type: 'string',
          desc: '指定输出格式，如 wide/yaml/json',
          long: '--output'
        },
        {
          flag: '-A',
          type: 'boolean',
          desc: '查看所有命名空间下的资源',
          long: '--all-namespaces'
        }
      ]
    },
    {
      name: 'describe',
      desc: '查看指定资源的详细信息与事件',
      arguments: [
        {
          name: 'resource',
          type: 'string',
          required: true,
          desc: '资源类型'
        },
        {
          name: 'name',
          type: 'string',
          required: true,
          desc: '资源名称'
        }
      ]
    },
    {
      name: 'apply',
      desc: '根据配置文件创建/更新资源（声明式）',
      options: [
        {
          flag: '-f',
          type: 'string',
          desc: '指定 YAML/JSON 配置文件路径',
          long: '--filename'
        }
      ]
    },
    {
      name: 'delete',
      desc: '删除指定资源',
      arguments: [
        {
          name: 'resource',
          type: 'string',
          required: true,
          desc: '资源类型'
        },
        {
          name: 'name',
          type: 'string',
          required: true,
          desc: '资源名称'
        }
      ]
    },
    {
      name: 'logs',
      desc: '查看 Pod 的日志',
      arguments: [
        {
          name: 'pod',
          type: 'string',
          required: true,
          desc: 'Pod 名称'
        }
      ],
      options: [
        {
          flag: '-f',
          type: 'boolean',
          desc: '持续跟踪输出',
          long: '--follow'
        },
        {
          flag: '-c',
          type: 'string',
          desc: '指定容器名称（多容器 Pod 场景）',
          long: '--container'
        }
      ]
    },
    {
      name: 'exec',
      desc: '在 Pod 内的容器中执行命令',
      arguments: [
        {
          name: 'pod',
          type: 'string',
          required: true,
          desc: 'Pod 名称'
        },
        {
          name: 'command',
          type: 'string',
          required: true,
          desc: '要执行的命令'
        }
      ],
      options: [
        {
          flag: '-it',
          type: 'boolean',
          desc: '分配交互式终端'
        },
        {
          flag: '-c',
          type: 'string',
          desc: '指定容器名称',
          long: '--container'
        }
      ]
    },
    {
      name: 'create',
      desc: '根据配置文件创建资源（命令式）',
      options: [
        {
          flag: '-f',
          type: 'string',
          desc: '指定 YAML/JSON 配置文件路径',
          long: '--filename'
        }
      ]
    },
    {
      name: 'scale',
      desc: '调整指定资源的副本数量',
      arguments: [
        {
          name: 'resource',
          type: 'string',
          required: true,
          desc: '资源类型/名称，如 deployment/myapp'
        }
      ],
      options: [
        {
          flag: '--replicas',
          type: 'string',
          desc: '目标副本数'
        }
      ]
    },
    {
      name: 'rollout',
      desc: '管理工作负载的发布/回滚',
      arguments: [
        {
          name: 'action',
          type: 'string',
          required: true,
          desc: '如 status/restart/undo'
        },
        {
          name: 'resource',
          type: 'string',
          required: true,
          desc: '资源类型/名称'
        }
      ]
    },
    {
      name: 'config',
      desc: '查看/切换 kubeconfig 上下文',
      arguments: [
        {
          name: 'action',
          type: 'string',
          required: true,
          desc: '如 get-contexts/use-context/current-context'
        }
      ]
    }
  ],
  variants: {
    bsd: {
      supported: false,
      install: 'brew install kubectl',
      note: 'kubectl 是纯 Go 编写的静态二进制客户端，在 macOS 与各 Linux 发行版上命令行行为完全一致，没有类似 GNU/BSD 那样的实现差异，唯一的共同点是两边都不预装，需要分别通过 brew install kubectl 或官方脚本/包管理器安装。'
    }
  }
}

export default data
