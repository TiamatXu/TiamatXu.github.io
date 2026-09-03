import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sed',
  desc: '流式文本编辑器，用于替换、删除、插入文本',
  category: 'text-processing',
  arguments: [
    {
      name: 'script',
      type: 'string',
      required: true,
      desc: '编辑脚本，如 s/old/new/g'
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
      flag: '-i',
      type: 'boolean',
      desc: '直接修改源文件（原地编辑）',
      long: '--in-place'
    },
    {
      flag: '-n',
      type: 'boolean',
      desc: '取消默认输出，仅输出被脚本处理过的行',
      long: '--quiet'
    },
    {
      flag: '-e',
      type: 'string',
      desc: '追加一条编辑脚本',
      long: '--expression'
    },
    {
      flag: '-r',
      type: 'boolean',
      desc: '使用扩展正则表达式',
      long: '--regexp-extended'
    },
    {
      flag: '-E',
      type: 'boolean',
      desc: '使用扩展正则表达式（等价于 -r）',
      long: '--regexp-extended'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-i', '-n', '-e', '-E'],
      note: '最经典的跨平台坑：GNU sed 的 -i 可不带参数直接原地编辑（sed -i \'s/a/b/\' file），而 macOS 自带 BSD sed 的 -i 必须显式提供备份后缀参数（即使为空字符串），写法为 sed -i \'\' \'s/a/b/\' file，漏写会报错或产生非预期结果。此外 BSD sed 只支持 -E 表示扩展正则，不支持 GNU 的 -r。',
      source: 'BSD'
    }
  }
}

export default data
