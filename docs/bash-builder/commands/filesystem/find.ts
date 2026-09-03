import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'find',
  desc: '在目录树中递归查找文件',
  category: 'filesystem',
  arguments: [
    {
      name: 'path',
      type: 'path',
      required: false,
      desc: '查找起始路径',
      default: '.'
    }
  ],
  options: [
    {
      flag: '-name',
      type: 'string',
      desc: '按文件名匹配（区分大小写）'
    },
    {
      flag: '-iname',
      type: 'string',
      desc: '按文件名匹配（忽略大小写）'
    },
    {
      flag: '-type',
      type: 'enum',
      desc: '按类型过滤，f 文件 / d 目录 / l 符号链接',
      choices: ['f', 'd', 'l']
    },
    {
      flag: '-maxdepth',
      type: 'string',
      desc: '限制递归的最大目录深度'
    },
    {
      flag: '-mtime',
      type: 'string',
      desc: '按修改时间（天）过滤'
    },
    {
      flag: '-size',
      type: 'string',
      desc: '按文件大小过滤，如 +100k'
    },
    {
      flag: '-exec',
      type: 'string',
      desc: '对匹配结果执行指定命令'
    },
    {
      flag: '-delete',
      type: 'boolean',
      desc: '删除所有匹配到的文件'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 BSD find 与 GNU find 差异较大：不支持 -printf 格式化输出，-regex 使用的正则方言也不同；建议通过 brew install findutils 安装 GNU 版本（命令名为 gfind）以获得一致行为。',
      source: 'BSD'
    }
  }
}

export default data
