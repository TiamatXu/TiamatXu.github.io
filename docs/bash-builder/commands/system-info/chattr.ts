import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'chattr',
  desc: '修改 Linux 文件在 ext 系文件系统上的扩展属性（如不可变标志）',
  category: 'system-info',
  arguments: [
    {
      name: 'attributes',
      type: 'string',
      required: true,
      desc: '要设置/取消的属性，如 +i（不可变）、-i'
    },
    {
      name: 'file',
      type: 'path',
      required: true,
      desc: '目标文件'
    }
  ],
  variants: {
    ubuntu: {
      supported: true
    },
    centos: {
      supported: true
    },
    bsd: {
      supported: false,
      note: 'chattr/lsattr 依赖 Linux ext2/3/4 文件系统专属的扩展属性机制，macOS 默认使用 APFS/HFS+，没有对应命令；实现类似“不可变文件”效果需改用 chflags uchg 命令，查看则用 ls -lO。'
    }
  }
}

export default data
