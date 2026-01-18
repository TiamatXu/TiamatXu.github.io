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

  // When a user manually toggles the theme, their choice should be absolute,
  // overriding the media query. We can achieve this by setting the `content`
  // of BOTH meta tags to the desired color.
  const color = isDark.value ? darkColor : lightColor;

  const lightMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
  const darkMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');

  if (lightMeta) {
    lightMeta.content = color;
  }
  if (darkMeta) {
    darkMeta.content = color;
  }
}

onMounted(updateThemeColor)
watch(isDark, updateThemeColor)
</script>

<template></template>
