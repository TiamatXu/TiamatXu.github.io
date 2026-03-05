/// <reference types="vitepress/client" />

declare module '@vuetheme/config' {
  import { UserConfig } from 'vitepress'
  const config: () => Promise<UserConfig>
  export default config
}

declare module '@vuetheme/highlight' {
  const createHighlighter: () => Promise<(input: string) => string>
  export default createHighlighter
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_BUILD_TIME: string
}
