import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'unzip',
  desc: '解压 zip 格式压缩包',
  category: 'archive',
  arguments: [
    {
      name: 'archive',
      type: 'file',
      required: true,
      desc: '要解压的 zip 文件'
    }
  ],
  options: [
    {
      flag: '-l',
      type: 'boolean',
      desc: '仅列出压缩包内容，不解压',
      long: '--list'
    },
    {
      flag: '-o',
      type: 'boolean',
      desc: '解压时覆盖已存在文件且不提示',
      long: '--overwrite'
    },
    {
      flag: '-d',
      type: 'string',
      desc: '指定解压到的目标目录'
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
      note: 'unzip（Info-ZIP）在 macOS 上默认预装，用法与 Linux 上的同源实现基本一致。',
      source: 'BSD'
    }
  }
}

export default data
