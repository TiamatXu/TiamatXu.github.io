<script lang="ts" setup>
import VTLink from './VTLink.vue'
import { MenuItemWithLink } from '@vuetheme'

defineProps<{ item: MenuItemWithLink }>()
</script>

<template>
  <VTLink class="vt-menu-link" :href="item.link" :badge="item.badge"> {{ item.text }} </VTLink>
</template>
