import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ps',
  desc: '显示当前进程快照',
  category: 'process',
  options: [
    {
      flag: '-e',
      type: 'boolean',
      desc: '显示所有进程（等价于 -A）'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '以完整格式显示（含命令行参数）'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示所有终端关联的进程'
    },
    {
      flag: '-u',
      type: 'string',
      desc: '以面向用户的格式显示，含 CPU/内存占用'
    },
    {
      flag: '-x',
      type: 'boolean',
      desc: '显示无控制终端的进程（如后台服务）'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: '经典组合 ps aux 与 ps -ef 在 macOS 自带的 ps 上均可正常使用（macOS ps 同时兼容 BSD 与部分 SysV 风格选项）；但 --sort、-eo 自定义字段等 GNU 专属语法不受支持，输出列也存在细微差异。',
      source: 'BSD'
    }
  }
}

export default data
