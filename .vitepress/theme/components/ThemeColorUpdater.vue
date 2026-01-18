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

  // Look for a meta tag that is not controlled by a media query.
  let manualMetaTag = document.querySelector('meta[name="theme-color"]:not([media])')

  if (manualMetaTag) {
    // If it exists, just update its content.
    manualMetaTag.content = color
  } else {
    // If it doesn't exist, this is the first time we are overriding.
    // Remove the media-query based tags to avoid conflicts.
    document.querySelectorAll('meta[name="theme-color"][media]').forEach((el) => el.remove())

    // And create a new one to gain control.
    const newMeta = document.createElement('meta')
    newMeta.name = 'theme-color'
    newMeta.content = color
    document.head.appendChild(newMeta)
  }
}

onMounted(updateThemeColor)
watch(isDark, updateThemeColor)
</script>

<template></template>
