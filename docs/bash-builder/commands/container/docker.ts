import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'docker',
  desc: '构建、运行和管理容器',
  category: 'container',
  subcommands: [
    {
      name: 'run',
      desc: '基于镜像创建并启动一个新容器',
      arguments: [
        {
          name: 'image',
          type: 'string',
          required: true,
          desc: '镜像名称'
        },
        {
          name: 'command',
          type: 'string',
          required: false,
          desc: '容器启动后执行的命令，省略则使用镜像默认命令'
        }
      ],
      options: [
        {
          flag: '-d',
          type: 'boolean',
          desc: '后台运行容器（守护态）',
          long: '--detach'
        },
        {
          flag: '-p',
          type: 'string',
          desc: '映射端口，如 8080:80',
          long: '--publish'
        },
        {
          flag: '-v',
          type: 'string',
          desc: '挂载数据卷，如 /host:/container',
          long: '--volume'
        },
        {
          flag: '--name',
          type: 'string',
          desc: '为容器指定名称'
        },
        {
          flag: '-it',
          type: 'boolean',
          desc: '分配交互式终端（常与 shell 容器搭配）'
        },
        {
          flag: '--rm',
          type: 'boolean',
          desc: '容器退出后自动删除'
        }
      ]
    },
    {
      name: 'build',
      desc: '根据 Dockerfile 构建镜像',
      arguments: [
        {
          name: 'path',
          type: 'path',
          required: false,
          desc: '构建上下文目录',
          default: '.'
        }
      ],
      options: [
        {
          flag: '-t',
          type: 'string',
          desc: '为镜像打标签，如 myapp:1.0',
          long: '--tag'
        },
        {
          flag: '-f',
          type: 'string',
          desc: '指定 Dockerfile 路径',
          long: '--file'
        },
        {
          flag: '--no-cache',
          type: 'boolean',
          desc: '构建时不使用缓存层'
        }
      ]
    },
    {
      name: 'ps',
      desc: '列出容器',
      options: [
        {
          flag: '-a',
          type: 'boolean',
          desc: '显示所有容器（含已停止的）',
          long: '--all'
        },
        {
          flag: '-q',
          type: 'boolean',
          desc: '仅显示容器 ID',
          long: '--quiet'
        }
      ]
    },
    {
      name: 'images',
      desc: '列出本地镜像',
      options: [
        {
          flag: '-a',
          type: 'boolean',
          desc: '显示所有镜像（含中间层镜像）',
          long: '--all'
        }
      ]
    },
    {
      name: 'pull',
      desc: '从镜像仓库拉取镜像',
      arguments: [
        {
          name: 'image',
          type: 'string',
          required: true,
          desc: '镜像名称'
        }
      ]
    },
    {
      name: 'push',
      desc: '将镜像推送到镜像仓库',
      arguments: [
        {
          name: 'image',
          type: 'string',
          required: true,
          desc: '镜像名称'
        }
      ]
    },
    {
      name: 'exec',
      desc: '在运行中的容器内执行命令',
      arguments: [
        {
          name: 'container',
          type: 'string',
          required: true,
          desc: '容器名称/ID'
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
        }
      ]
    },
    {
      name: 'logs',
      desc: '查看容器的输出日志',
      arguments: [
        {
          name: 'container',
          type: 'string',
          required: true,
          desc: '容器名称/ID'
        }
      ],
      options: [
        {
          flag: '-f',
          type: 'boolean',
          desc: '持续跟踪输出（类似 tail -f）',
          long: '--follow'
        },
        {
          flag: '--tail',
          type: 'string',
          desc: '只显示最后 N 行日志'
        }
      ]
    },
    {
      name: 'stop',
      desc: '停止一个或多个运行中的容器',
      arguments: [
        {
          name: 'container',
          type: 'string',
          required: true,
          desc: '容器名称/ID',
          multiple: true
        }
      ]
    },
    {
      name: 'rm',
      desc: '删除一个或多个容器',
      arguments: [
        {
          name: 'container',
          type: 'string',
          required: true,
          desc: '容器名称/ID',
          multiple: true
        }
      ],
      options: [
        {
          flag: '-f',
          type: 'boolean',
          desc: '强制删除运行中的容器',
          long: '--force'
        }
      ]
    },
    {
      name: 'rmi',
      desc: '删除一个或多个镜像',
      arguments: [
        {
          name: 'image',
          type: 'string',
          required: true,
          desc: '镜像名称/ID',
          multiple: true
        }
      ],
      options: [
        {
          flag: '-f',
          type: 'boolean',
          desc: '强制删除',
          long: '--force'
        }
      ]
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      install: 'curl -fsSL https://get.docker.com | sh',
      note: 'Ubuntu 默认不预装 Docker，需要单独安装 docker.io 或官方 docker-ce 包。'
    },
    centos: {
      supported: false,
      install: 'sudo yum install docker-ce',
      note: 'CentOS 默认不预装 Docker，需要添加官方仓库后安装 docker-ce。'
    },
    bsd: {
      supported: false,
      note: 'macOS 内核不具备 Linux 容器所需的原生能力，Docker Desktop for Mac（或 colima/OrbStack 等替代品）实际是在后台透明启动一个轻量级 Linux 虚拟机来运行容器，命令行用法与 Linux 上完全一致，但底层架构完全不同；并非系统预装，需要单独安装。'
    }
  }
}

export default data
