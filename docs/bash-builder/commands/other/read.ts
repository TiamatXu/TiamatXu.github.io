import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'read',
  desc: '从标准输入读取一行内容并赋值给变量',
  category: 'other',
  arguments: [
    {
      name: 'variable',
      type: 'string',
      required: true,
      desc: '要赋值的变量名',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-p',
      type: 'string',
      desc: '读取前显示提示信息',
      long: '--prompt'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '静默模式，输入内容不回显（常用于密码输入）',
      long: '--silent'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '按原始方式读取，不处理反斜杠转义',
      long: '--raw'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'read 是 shell（bash/zsh）内建命令，常用选项在两个平台上行为一致。',
      source: 'BSD'
    }
  }
}

export default data
