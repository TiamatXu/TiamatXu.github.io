<script lang="ts" setup>
import VPNavBarTitle from './VPNavBarTitle.vue'
import VPNavBarSearch from './VPNavBarSearch.vue'
import VPNavBarMenu from './VPNavBarMenu.vue'
import VPNavBarAppearance from './VPNavBarAppearance.vue'
import VPNavBarSocialLinks from './VPNavBarSocialLinks.vue'
import VPNavBarExtra from './VPNavBarExtra.vue'
import VPNavBarHamburger from './VPNavBarHamburger.vue'

defineProps<{
  isScreenOpen: boolean
}>()
</script>

<template>
  <div class="VPNavBar">
    <div class="container">
      <VPNavBarTitle class="title">
        <template #navbar-title>
          <slot name="navbar-title" />
        </template>
      </VPNavBarTitle>
      <div class="center">
        <VPNavBarMenu class="menu" />
      </div>
      <div class="content">
        <VPNavBarSearch class="search" />
        <VPNavBarAppearance class="appearance" />
        <VPNavBarSocialLinks class="social-links" />
        <VPNavBarExtra class="extra" />
        <VPNavBarHamburger class="hamburger" :active="isScreenOpen" @click="$emit('toggle-screen')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPNavBar {
  position: relative;
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 0 12px 0 24px;
  height: var(--vt-nav-height);
  white-space: nowrap;
  transition: border-color 0.5s, background-color 0.5s;
  background-color: color-mix(in srgb, var(--vt-c-bg) 45%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

@media (min-width: 768px) {
  .VPNavBar {
    padding: 0 12px 0 32px;
  }
}

@media (min-width: 1280px) {
  .VPNavBar {
    padding: 0 32px;
  }
}

.container {
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: var(--vp-screen-max-width);
  position: relative;
}

.title {
  display: flex;
  align-items: center;
}

.center {
  /* center the menu in the navbar (absolute center of .container) */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  pointer-events: auto;
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
}

/* spacing between right-side controls */
.appearance + .social-links {
  margin-left: 4px;
}
</style>
