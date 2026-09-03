import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'test',
  desc: '判断文件属性或进行字符串/数值比较（等价于 [ ]）',
  category: 'other',
  arguments: [
    {
      name: 'expression',
      type: 'string',
      required: true,
      desc: '要判断的表达式'
    }
  ],
  options: [
    {
      flag: '-e',
      type: 'boolean',
      desc: '判断路径是否存在'
    },
    {
      flag: '-f',
      type: 'boolean',
      desc: '判断是否为普通文件'
    },
    {
      flag: '-d',
      type: 'boolean',
      desc: '判断是否为目录'
    },
    {
      flag: '-z',
      type: 'boolean',
      desc: '判断字符串是否为空'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '判断字符串是否非空'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'test（及 [ ）是 POSIX 标准内建命令，常用判断选项在两个平台上完全一致。',
      source: 'BSD'
    }
  }
}

export default data
