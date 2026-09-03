import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'readlink',
  desc: '显示符号链接指向的目标路径',
  category: 'filesystem',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: true,
      desc: '符号链接文件路径'
    }
  ],
  options: [
    {
      flag: '-f',
      type: 'boolean',
      desc: '递归解析所有符号链接，输出规范化绝对路径',
      long: '--canonicalize'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '输出结果不追加换行符',
      long: '--no-newline'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-n'],
      note: 'macOS 自带 BSD readlink 不支持 -f（递归解析出规范化绝对路径），这是最常见的跨平台脚本报错来源之一。替代方案：改用 realpath 命令，或 brew install coreutils 后使用 greadlink -f。',
      source: 'BSD'
    }
  }
}

export default data
