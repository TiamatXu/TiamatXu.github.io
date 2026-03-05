import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@vuetheme'
import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference
} from './components/preferences'
import Giscus from '@theme/components/Giscus.vue'
import ScrimbaLink from './components/ScrimbaLink.vue'

import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'virtual:group-icons.css'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      'content-bottom': () => h(Giscus)
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('ScrimbaLink', ScrimbaLink)
  }
})
