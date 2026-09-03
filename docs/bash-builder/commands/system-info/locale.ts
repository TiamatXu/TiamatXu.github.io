import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'locale',
  desc: '查看或设置本地化（语言/编码）环境',
  category: 'system-info',
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '列出系统当前已安装的所有可用 locale',
      long: '--all-locales'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'locale 命令在 macOS 与 Linux 上均预装，用法一致；但 macOS 默认自带的可用 locale 数量通常远少于典型的 glibc Linux 发行版，某些区域设置可能需要额外配置。',
      source: 'BSD'
    }
  }
}

export default data
