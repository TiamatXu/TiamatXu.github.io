import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'system_profiler',
  desc: '生成 macOS 硬件与软件配置的详细报告',
  category: 'system-info',
  arguments: [
    {
      name: 'datatype',
      type: 'string',
      required: false,
      desc: '要查询的数据类型，如 SPHardwareDataType、SPUSBDataType'
    }
  ],
  variants: {
    ubuntu: {
      supported: false,
      note: 'system_profiler 是 macOS 专属命令，Linux 上没有对应命令；硬件信息通常需要组合 lscpu、lsusb、lspci、lsblk 等多个命令查看。'
    },
    centos: {
      supported: false,
      note: 'system_profiler 是 macOS 专属命令，Linux 上没有对应命令；硬件信息通常需要组合 lscpu、lsusb、lspci、lsblk 等多个命令查看。'
    },
    bsd: {
      supported: true,
      note: 'system_profiler 是 macOS 独有的系统信息汇总工具，一定程度上相当于 Linux 上 lscpu + lsusb + lspci + lsblk 等命令的合集，常用于生成完整的硬件报告。',
      source: 'BSD'
    }
  }
}

export default data
