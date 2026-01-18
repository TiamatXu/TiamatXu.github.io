<script setup>
import { useData } from 'vitepress'
import { watch, onMounted } from 'vue'

const { isDark } = useData()

const lightColor = '#ffffff'
const darkColor = '#1a1a1a'

function updateThemeColor() {
  const color = isDark.value ? darkColor : lightColor
  if (typeof window !== 'undefined') {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
  }
}

onMounted(() => {
  updateThemeColor()
})

watch(isDark, () => {
  updateThemeColor()
})
</script>

<template></template>
