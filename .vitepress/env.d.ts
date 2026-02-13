/// <reference types="vitepress/client" />
// <reference types="vue/macros-global" />

declare module '@vuetheme/config' {
  import { UserConfig } from 'vitepress'
  const config: () => Promise<UserConfig>
  export default config
}

declare module '@vuetheme/highlight' {
  const createHighlighter: () => Promise<(input: string) => string>
  export default createHighlighter
}

