<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  command: string
}>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.command)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>

<template>
  <div class="command-preview">
    <div class="preview-header">
      <span class="title">生成命令</span>
      <button class="copy-button" @click="copy">
        {{ copied ? '已复制!' : '复制' }}
      </button>
    </div>
    <div class="preview-content">
      <code>$ {{ command }}</code>
    </div>
  </div>
</template>

<style scoped>
.command-preview {
  margin-top: 24px;
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vt-c-divider);
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: var(--vt-c-bg-mute);
  border-bottom: 1px solid var(--vt-c-divider);
}

.title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vt-c-text-2);
  text-transform: uppercase;
}

.copy-button {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--vt-c-brand);
  color: white;
  transition: opacity 0.2s;
}

.copy-button:hover {
  opacity: 0.8;
}

.preview-content {
  padding: 16px;
  font-family: var(--vt-font-family-mono);
  font-size: 14px;
  color: var(--vt-c-text-code);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
