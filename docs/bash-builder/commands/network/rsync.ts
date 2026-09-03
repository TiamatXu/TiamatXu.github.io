import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'rsync',
  desc: '高效的文件同步/增量备份工具',
  category: 'network',
  arguments: [
    {
      name: 'source',
      type: 'path',
      required: true,
      desc: '源路径'
    },
    {
      name: 'dest',
      type: 'path',
      required: true,
      desc: '目标路径'
    }
  ],
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '归档模式，保留权限/时间戳并递归同步',
      long: '--archive'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示详细过程',
      long: '--verbose'
    },
    {
      flag: '-z',
      type: 'boolean',
      desc: '传输时压缩数据',
      long: '--compress'
    },
    {
      flag: '--delete',
      type: 'boolean',
      desc: '删除目标中源端已不存在的文件'
    },
    {
      flag: '-h',
      type: 'boolean',
      desc: '以人类可读方式显示数值',
      long: '--human-readable'
    },
    {
      flag: '--progress',
      type: 'boolean',
      desc: '显示传输进度'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: '重要差异：出于 GPLv3 许可证原因，macOS 自带的 rsync 版本长期停留在很旧的 2.6.9（Linux 上通常是 3.x），缺少 --info=progress2 等新版本特性、增量算法与部分行为也有差异。建议 brew install rsync 使用最新版本以获得与 Linux 一致的体验。',
      source: 'BSD'
    }
  }
}

export default data
