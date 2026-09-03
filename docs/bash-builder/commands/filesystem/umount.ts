import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'umount',
  desc: '卸载已挂载的文件系统',
  category: 'filesystem',
  arguments: [
    {
      name: 'target',
      type: 'string',
      required: true,
      desc: '挂载点或设备'
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'boolean',
      desc: '强制卸载',
      long: '--force'
    },
    {
      flag: '-l',
      type: 'boolean',
      desc: '延迟卸载（等待资源不再繁忙）',
      long: '--lazy'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-f'],
      note: 'macOS 自带 BSD umount 没有 GNU 的 -l（延迟卸载）选项；日常更推荐使用 diskutil unmount，对外接磁盘尤其更安全。',
      source: 'BSD'
    }
  }
}

export default data
