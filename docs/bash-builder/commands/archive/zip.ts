import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'zip',
  desc: '创建 zip 格式压缩包',
  category: 'archive',
  arguments: [
    {
      name: 'archive',
      type: 'file',
      required: true,
      desc: '要创建/更新的 zip 文件名'
    },
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '要加入压缩包的文件/目录',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-r',
      type: 'boolean',
      desc: '递归压缩目录',
      long: '--recurse-paths'
    },
    {
      flag: '-e',
      type: 'boolean',
      desc: '加密压缩包（交互式输入密码）',
      long: '--encrypt'
    },
    {
      flag: '-x',
      type: 'string',
      desc: '排除指定文件',
      long: '--exclude'
    },
    {
      flag: '-q',
      type: 'boolean',
      desc: '静默模式',
      long: '--quiet'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'zip（Info-ZIP）在 macOS 上默认预装，用法与 Linux 上的同源实现基本一致。',
      source: 'BSD'
    }
  }
}

export default data
