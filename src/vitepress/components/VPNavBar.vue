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
const buildTime = import.meta.env.VITE_APP_BUILD_TIME
const formattedBuildTime = buildTime ? new Date(buildTime).toString() : 'Fetch failed with no build time.'
</script>

<template>
  <div class="VPNavBar">
    <div class="container">
      <VPNavBarTitle>
        <template #navbar-title>
          <slot name="navbar-title" />
        </template>
      </VPNavBarTitle>
      <div class="content">
        <VPNavBarSearch class="search" />
        <VPNavBarMenu class="menu" />
        <VPNavBarAppearance class="appearance" />
        <VPNavBarSocialLinks class="social-links" />
        <VPNavBarExtra class="extra" />
        <VPNavBarHamburger class="hamburger" :active="isScreenOpen" @click="$emit('toggle-screen')" />
      </div>
      <div class="time-tag">
        <div class="create-time">创建于: 2025/12/25</div>
        <div v-if="formattedBuildTime" class="build-time">最后部署于: {{ formattedBuildTime }}</div>
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
  background-color: var(--vt-c-bg);
  white-space: nowrap;
  transition:
    border-color 0.5s,
    background-color 0.5s;
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
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--vp-screen-max-width);
  position: relative;
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.menu + .appearance {
  margin-left: 8px;
}

.menu + .social-links {
  margin-left: 12px;
}

.appearance + .social-links {
  margin-left: 12px;
}

.time-tag {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  top: calc(var(--vt-nav-height) + 5px);
  z-index: -1;
}

.create-time,
.build-time {
  font-size: 0.8em;
  color: var(--vt-c-text-3);
}
</style>
