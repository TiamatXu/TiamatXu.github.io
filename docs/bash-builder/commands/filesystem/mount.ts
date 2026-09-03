import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'mount',
  desc: '挂载文件系统',
  category: 'filesystem',
  arguments: [
    {
      name: 'device',
      type: 'string',
      required: false,
      desc: '设备或远程资源'
    },
    {
      name: 'mountpoint',
      type: 'path',
      required: false,
      desc: '挂载点目录'
    }
  ],
  options: [
    {
      flag: '-t',
      type: 'string',
      desc: '指定文件系统类型',
      long: '--types'
    },
    {
      flag: '-o',
      type: 'string',
      desc: '指定挂载选项（如 ro、noexec）',
      long: '--options'
    },
    {
      flag: '-a',
      type: 'boolean',
      desc: '挂载 fstab 中所有标记的文件系统',
      long: '--all'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD mount，直接不带参数运行即可查看当前挂载列表；日常图形化磁盘操作更推荐使用 diskutil mount/unmount，文件系统类型（如 apfs/hfs）与 Linux 常见的 ext4/xfs 完全不同。',
      source: 'BSD'
    }
  }
}

export default data
