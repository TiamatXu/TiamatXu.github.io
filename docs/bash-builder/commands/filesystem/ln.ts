import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'ln',
  desc: '创建文件链接',
  category: 'filesystem',
  arguments: [
    {
      name: 'target',
      type: 'path',
      required: true,
      desc: '被链接的源文件'
    },
    {
      name: 'link_name',
      type: 'path',
      required: false,
      desc: '要创建的链接名称'
    }
  ],
  options: [
    {
      flag: '-s',
      type: 'boolean',
      desc: '创建符号链接（软链接）而非硬链接',
      long: '--symbolic'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '强制覆盖已存在的目标文件',
      long: '--force'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示链接创建过程',
      long: '--verbose'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      source: 'BSD'
    }
  }
}

export default data
