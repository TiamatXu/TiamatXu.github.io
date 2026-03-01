import { ref, watch } from 'vue'

const storageKey = 'vitepress-theme-appearance'

const isDark = ref(false)
let isInitialized = false

export function useAppearance() {
  if (typeof window !== 'undefined' && !isInitialized) {
    isInitialized = true
    let userPreference = localStorage.getItem(storageKey) || 'auto'
    const query = window.matchMedia(`(prefers-color-scheme: dark)`)
    const classList = document.documentElement.classList
    
    isDark.value = userPreference === 'auto' ? query.matches : userPreference === 'dark'
    
    const setClass = (dark: boolean) => classList[dark ? 'add' : 'remove']('dark')

    query.onchange = (e) => {
      if (localStorage.getItem(storageKey) === 'auto') {
        setClass((isDark.value = e.matches))
      }
    }

    watch(isDark, (dark) => {
      setClass(dark)
      localStorage.setItem(
        storageKey,
        (userPreference = dark ? (query.matches ? 'auto' : 'dark') : query.matches ? 'light' : 'auto')
      )
    }, { immediate: true })
  }

  const toggle = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
