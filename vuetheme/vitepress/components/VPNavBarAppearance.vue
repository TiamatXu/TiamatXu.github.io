<script lang="ts" setup>
import { VTSwitchAppearance } from '../../core'
import { useConfig } from '../composables/config'

const { config } = useConfig()
</script>

<template>
  <div v-if="config.appearance" class="VPNavBarAppearance">
    <VTSwitchAppearance />
  </div>
</template>

<style scoped>
.VPNavBarAppearance {
  display: none;
  align-items: center;
}

@media (min-width: 1280px) {
  .VPNavBarAppearance {
    display: flex;
  }

  .VPNavBarAppearance::after {
    width: 1px;
    height: 24px;
    background-color: var(--vt-c-divider-light);
    content: '';
  }

  .VPNavBarAppearance::after {
    margin-left: 12px;
  }
}
</style>
