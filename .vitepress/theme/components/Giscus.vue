<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import Giscus from '@giscus/vue'
import { useAppearance } from '@vuetheme/core/composables/appearance'

const route = useRoute()
const { isDark } = useAppearance()
const giscusTheme = computed(() => (isDark.value ? 'dark' : 'light'))
</script>

<template>
  <div class="giscus-container">
    <Giscus
      :key="route.path"
      repo="TiamatXu/TiamatXu.github.io"
      repoId="R_kgDOQupP8Q"
      category="Announcements"
      categoryId="DIC_kwDOQupP8c4C1GUE"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      :theme="giscusTheme"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>

<style scoped>
.giscus .giscus-frame .giscus-container {
  transition: border-color 0.5s, background-color 0.5s, color 0.5s;
}

.giscus-container {
  margin-top: 2rem;
  width: 100%;
}
</style>
