<script setup>
import { useData } from 'vitepress'
import { watch, onMounted } from 'vue'

const { isDark } = useData()

const lightColor = '#ffffff'
const darkColor = '#1a1a1a'

function updateThemeColor() {
  if (typeof window === 'undefined') {
    return
  }
  
  const color = isDark.value ? darkColor : lightColor

  // Remove all theme-color meta tags to avoid conflicts.
  document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove())

  // Add the new theme-color meta tag.
  const meta = document.createElement('meta')
  meta.name = 'theme-color'
  meta.content = color
  document.head.appendChild(meta)
}

onMounted(() => {
  // Update the theme color as soon as the component is mounted.
  updateThemeColor()
})

watch(isDark, () => {
  // And update it again whenever the theme changes.
  updateThemeColor()
})
</script>

<template></template>
