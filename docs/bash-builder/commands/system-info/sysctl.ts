import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'sysctl',
  desc: '查看或修改内核运行时参数',
  category: 'system-info',
  arguments: [
    {
      name: 'parameter',
      type: 'string',
      required: false,
      desc: '参数名，如 kernel.hostname 或 hw.ncpu'
    }
  ],
  options: [
    {
      flag: '-a',
      type: 'boolean',
      desc: '显示所有可用参数及当前值',
      long: '--all'
    },
    {
      flag: '-w',
      type: 'string',
      desc: '写入并设置指定参数的值（GNU 语法）',
      long: '--write'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      availableOptions: ['-a'],
      note: 'sysctl 在 macOS 与 Linux 上均存在，但参数命名空间完全不同：Linux 常见 kernel.*、vm.swappiness 等，macOS 常见 hw.ncpu、kern.hostname、vm.swapusage 等；这也是查询 macOS 上 CPU 核心数、内存等信息（弥补没有 nproc/free 的空缺）的常用手段。macOS 上写入参数一般用 sysctl -w key=value 或直接 sysctl key=value，而不完全等价于 GNU sysctl 的 --write 长选项写法。',
      source: 'BSD'
    }
  }
}

export default data
