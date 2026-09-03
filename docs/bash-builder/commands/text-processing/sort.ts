import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sort',
  desc: '对文本行进行排序',
  category: 'text-processing',
  arguments: [
    {
      name: 'file',
      type: 'file',
      required: false,
      desc: '要排序的文件路径',
      multiple: true
    }
  ],
  options: [
    {
      flag: '-n',
      type: 'boolean',
      desc: '按数值大小排序',
      long: '--numeric-sort'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '倒序排序',
      long: '--reverse'
    },
    {
      flag: '-u',
      type: 'boolean',
      desc: '排序后去除重复行',
      long: '--unique'
    },
    {
      flag: '-k',
      type: 'string',
      desc: '指定排序所依据的字段',
      long: '--key'
    },
    {
      flag: '-t',
      type: 'string',
      desc: '指定字段分隔符',
      long: '--field-separator'
    },
    {
      flag: '-h',
      type: 'boolean',
      desc: '按人类可读数值排序（如 1K、2M）',
      long: '--human-numeric-sort'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-n', '-r', '-u', '-k', '-t'],
      note: 'macOS 自带 BSD sort 没有 GNU 的 -h（按人类可读数值排序，如 1K/2M）选项。',
      source: 'BSD'
    }
  }
}

export default data
