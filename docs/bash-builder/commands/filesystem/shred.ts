import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'shred',
  desc: '反复覆写文件内容后删除，尝试防止数据恢复',
  category: 'filesystem',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要粉碎删除的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-u',
      type: 'boolean',
      desc: '覆写后删除该文件',
      long: '--remove'
    },
    {
      flag: '-n',
      type: 'string',
      desc: '指定覆写的次数',
      long: '--iterations'
    },
    {
      flag: '-z',
      type: 'boolean',
      desc: '最后额外用零覆写一次以隐藏粉碎痕迹',
      long: '--zero'
    }
  ],
  variants: {
    bsd: {
      supported: false,
      note: 'macOS 没有 shred 命令；且在现代 SSD/APFS 上，反复覆写这类基于机械硬盘特性设计的擦除方式已基本无效，苹果的建议是依赖 FileVault 全盘加密后直接删除。如仍需要类似工具可 brew install coreutils 使用 gshred，但同样不保证对 SSD 有效。'
    }
  }
}

export default data
