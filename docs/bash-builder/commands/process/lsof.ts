import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'lsof',
  desc: '列出当前系统打开的文件（含网络端口/socket）',
  category: 'process',
  options: [
    {
      flag: '-i',
      type: 'string',
      desc: '只显示网络相关的打开文件（socket/端口）'
    },
    {
      flag: '-p',
      type: 'string',
      desc: '只显示指定 PID 打开的文件'
    },
    {
      flag: '-u',
      type: 'string',
      desc: '只显示指定用户打开的文件'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 默认预装 lsof，常用于查看端口占用（lsof -i :端口号），弥补 macOS 没有 netstat -p 的空缺；部分精简版 Linux 发行版（尤其是容器基础镜像）默认不预装，需要 apt install lsof。',
      source: 'BSD'
    }
  }
}

export default data
