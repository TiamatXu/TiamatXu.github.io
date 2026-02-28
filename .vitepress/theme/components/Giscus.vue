<script setup>
import { onMounted, onUnmounted } from 'vue'

const updateGiscusTheme = () => {
  const isDark = document.documentElement.classList.contains('dark')
  const theme = isDark ? 'dark' : 'light'
  const iframe = document.querySelector('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    )
  }
}

let observer

onMounted(() => {
  // 监听 giscus 加载完成的消息
  const handleMessage = (event) => {
    if (event.origin !== 'https://giscus.app') return
    if (event.data.giscus && (event.data.giscus.viewer || event.data.giscus.discussion)) {
      updateGiscusTheme()
    }
  }

  window.addEventListener('message', handleMessage)

  // 使用 MutationObserver 监听 html 标签 class 的变化（主题切换逻辑会修改它）
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        updateGiscusTheme()
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  // 初始化插入脚本
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'TiamatXu/TiamatXu.github.io')
  script.setAttribute('data-repo-id', 'R_kgDOQupP8Q')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOQupP8c4C1GUE')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  
  // 根据初始 class 设置主题
  const isDarkInitial = document.documentElement.classList.contains('dark')
  script.setAttribute('data-theme', isDarkInitial ? 'dark' : 'light')
  
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.crossOrigin = 'anonymous'
  script.async = true
  document.querySelector('.giscus-container').appendChild(script)

  onUnmounted(() => {
    window.removeEventListener('message', handleMessage)
    observer?.disconnect()
  })
})
</script>

<template>
  <div class="giscus-container" />
</template>

<style scoped>
.giscus-container {
  margin-top: 2rem;
  width: 100%;
}
</style>
