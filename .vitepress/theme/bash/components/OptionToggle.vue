<script setup lang="ts">
import type { CommandOption } from '../types'

defineProps<{
  option: CommandOption
  selected: boolean
  disabled: boolean
  reason?: string
}>()

defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <div 
    class="option-toggle" 
    :class="{ 'is-selected': selected, 'is-disabled': disabled }"
    @click="!disabled && $emit('toggle')"
    :title="reason || option.desc"
  >
    <div class="checkbox">
      <div class="inner" v-if="selected"></div>
    </div>
    <div class="content">
      <div class="flags">
        <span class="flag">{{ option.flag }}</span>
        <span v-if="option.long" class="long">{{ option.long }}</span>
      </div>
      <div class="desc">{{ option.desc }}</div>
      <div v-if="disabled && reason" class="reason">{{ reason }}</div>
    </div>
  </div>
</template>

<style scoped>
.option-toggle {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--vt-c-divider);
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--vt-c-bg);
  user-select: none;
}

.option-toggle:hover:not(.is-disabled) {
  border-color: var(--vt-c-brand);
  background-color: var(--vt-c-bg-soft);
}

.option-toggle.is-selected {
  border-color: var(--vt-c-brand);
  background-color: rgba(66, 184, 131, 0.05);
}

.option-toggle.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: var(--vt-c-bg-mute);
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--vt-c-divider);
  border-radius: 4px;
  margin-right: 12px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.is-selected .checkbox {
  border-color: var(--vt-c-brand);
  background-color: var(--vt-c-brand);
}

.inner {
  width: 8px;
  height: 4px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg) translateY(-1px);
}

.flags {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.flag, .long {
  font-family: var(--vt-font-family-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
}

.long {
  color: var(--vt-c-text-2);
  font-weight: 400;
}

.desc {
  font-size: 13px;
  color: var(--vt-c-text-2);
  line-height: 1.4;
}

.reason {
  font-size: 11px;
  color: var(--vt-c-red);
  margin-top: 4px;
}
</style>
