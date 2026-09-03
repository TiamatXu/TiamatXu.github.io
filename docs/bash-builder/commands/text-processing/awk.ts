import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'awk',
  desc: '模式扫描与文本处理语言',
  category: 'text-processing',
  arguments: [
    {
      name: 'program',
      type: 'string',
      required: true,
      desc: 'awk 程序脚本'
    },
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要处理的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-F',
      type: 'string',
      desc: '指定字段分隔符',
      long: '--field-separator'
    },
    {
      flag: '-v',
      type: 'string',
      desc: '在程序执行前为变量赋值'
    },
    {
      flag: '-f',
      type: 'string',
      desc: '从文件读取 awk 程序',
      long: '--file'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带的 awk 是 “one true awk”（BWK awk），并非 gawk，不支持 gawk 的部分扩展语法（如 --posix、部分数组/时间函数扩展）；日常 -F/-v/-f 等基础用法两者一致，如需 gawk 特性可 brew install gawk。',
      source: 'BSD'
    }
  }
}

export default data
