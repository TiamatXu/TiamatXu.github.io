<script lang="ts" setup>
import VTSwitch from './VTSwitch.vue'
import VTIconSun from './icons/VTIconSun.vue'
import VTIconMoon from './icons/VTIconMoon.vue'
import { useConfig } from '../../vitepress/composables/config'
import { useAppearance } from '../composables/appearance'

const { config } = useConfig()

const { isDark, toggle } = typeof localStorage !== 'undefined' ? useAppearance() : { isDark: false, toggle: () => {} }
</script>

<template>
  <VTSwitch
    class="vt-switch-appearance"
    :aria-label="config.i18n?.ariaDarkMode ?? 'Toggle dark mode'"
    :aria-checked="isDark"
    @click="toggle"
  >
    <VTIconSun class="vt-switch-appearance-sun" />
    <VTIconMoon class="vt-switch-appearance-moon" />
  </VTSwitch>
</template>
