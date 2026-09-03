import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'tar',
  desc: '打包/解包 tar 归档文件，可结合 gzip/bzip2 压缩',
  category: 'archive',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '归档文件或要打包的源文件/目录',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-c',
      type: 'boolean',
      desc: '创建新归档',
      long: '--create'
    },
    {
      flag: '-x',
      type: 'boolean',
      desc: '解包归档',
      long: '--extract'
    },
    {
      flag: '-v',
      type: 'boolean',
      desc: '显示处理过程的详细信息',
      long: '--verbose'
    },
    {
      flag: '-f',
      type: 'string',
      desc: '指定归档文件名',
      long: '--file'
    },
    {
      flag: '-z',
      type: 'boolean',
      desc: '使用 gzip 压缩/解压',
      long: '--gzip'
    },
    {
      flag: '-j',
      type: 'boolean',
      desc: '使用 bzip2 压缩/解压',
      long: '--bzip2'
    },
    {
      flag: '-t',
      type: 'boolean',
      desc: '列出归档内容',
      long: '--list'
    }
  ],
  rules: [
    {
      type: 'conflicts',
      flags: ['-c', '-x', '-t']
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带的 tar 实际是基于 libarchive 的 bsdtar，对 -c/-x/-v/-f/-z/-j/-t 等常用选项做了兼容 GNU tar 的封装，日常使用差异很小；但个别 GNU 专属长选项（如 --wildcards 的默认行为、稀疏文件处理细节）表现不完全一致。',
      source: 'BSD'
    }
  }
}

export default data
