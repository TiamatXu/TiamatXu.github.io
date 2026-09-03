import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'openssl',
  desc: '通用加密/证书/哈希命令行工具集',
  category: 'other',
  arguments: [
    {
      name: 'command',
      type: 'string',
      required: true,
      desc: '子命令，如 genrsa/req/x509/enc/dgst/version'
    }
  ],
  options: [
    {
      flag: '-in',
      type: 'string',
      desc: '指定输入文件'
    },
    {
      flag: '-out',
      type: 'string',
      desc: '指定输出文件'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: '重要差异：出于系统集成考虑，较新版本 macOS 自带的是 LibreSSL 而非官方 OpenSSL（也有部分版本切回精简过的 OpenSSL），部分子命令参数、支持的加密算法与官方最新 OpenSSL 存在差异；如需和 Linux 服务器保持完全一致，建议 brew install openssl 并显式使用其路径。',
      source: 'BSD'
    }
  }
}

export default data
