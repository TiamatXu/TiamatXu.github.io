import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'fuser',
  desc: '识别正在使用指定文件、目录或端口的进程',
  category: 'process',
  arguments: [
    {
      name: 'target',
      type: 'string',
      required: true,
      desc: '文件路径或端口，如 /mnt 或 22/tcp'
    }
  ],
  options: [
    {
      flag: '-k',
      type: 'boolean',
      desc: '终止正在占用该资源的所有进程',
      long: '--kill'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示详细信息',
      long: '--verbose'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'macOS 没有 fuser 命令，查看哪个进程占用了文件或端口可改用 lsof（如 lsof /path 或 lsof -i :端口号）。'
    }
  }
}

export default data
