import type { CommandData } from '@theme/bash/types'

const data: CommandData = {
  name: 'curl',
  desc: '命令行数据传输工具，支持 HTTP/FTP 等协议',
  category: 'network',
  arguments: [
    {
      name: 'url',
      type: 'string',
      required: true,
      desc: '请求的目标 URL'
    }
  ],
  options: [
    {
      flag: '-X',
      type: 'string',
      desc: '指定 HTTP 请求方法',
      long: '--request'
    },
    {
      flag: '-H',
      type: 'string',
      desc: '添加请求头',
      long: '--header'
    },
    {
      flag: '-d',
      type: 'string',
      desc: '发送 POST 数据',
      long: '--data'
    },
    {
      flag: '-o',
      type: 'string',
      desc: '将响应内容写入指定文件',
      long: '--output'
    },
    {
      flag: '-L',
      type: 'boolean',
      desc: '跟随重定向',
      long: '--location'
    },
    {
      flag: '-I',
      type: 'boolean',
      desc: '仅获取响应头',
      long: '--head'
    },
    {
      flag: '-s',
      type: 'boolean',
      desc: '静默模式，不显示进度信息',
      long: '--silent'
    },
    {
      flag: '-k',
      type: 'boolean',
      desc: '跳过 SSL 证书校验',
      long: '--insecure'
    }
  ],
  variants: {
    bsd: {
      supported: true,
      note: 'macOS 自带 curl，命令行参数与 Linux 版本基本一致；但底层 SSL/TLS 库版本可能落后于最新 curl 发行版，部分极新特性（如 --http3）在系统自带版本上可能不可用，可通过 brew install curl 获取最新版。',
      source: 'BSD'
    }
  }
}

export default data
