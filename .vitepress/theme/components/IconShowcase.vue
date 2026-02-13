<script setup>
import VTIconAlignJustify from '@vuetheme/core/components/icons/VTIconAlignJustify.vue'
import VTIconAlignLeft from '@vuetheme/core/components/icons/VTIconAlignLeft.vue'
import VTIconAlignRight from '@vuetheme/core/components/icons/VTIconAlignRight.vue'
import VTIconChevronDown from '@vuetheme/core/components/icons/VTIconChevronDown.vue'
import VTIconChevronLeft from '@vuetheme/core/components/icons/VTIconChevronLeft.vue'
import VTIconChevronRight from '@vuetheme/core/components/icons/VTIconChevronRight.vue'
import VTIconChevronUp from '@vuetheme/core/components/icons/VTIconChevronUp.vue'
import VTIconCode from '@vuetheme/core/components/icons/VTIconCode.vue'
import VTIconCodePen from '@vuetheme/core/components/icons/VTIconCodePen.vue'
import VTIconCommand from '@vuetheme/core/components/icons/VTIconCommand.vue'
import VTIconDiscord from '@vuetheme/core/components/icons/VTIconDiscord.vue'
import VTIconEdit from '@vuetheme/core/components/icons/VTIconEdit.vue'
import VTIconExternalLink from '@vuetheme/core/components/icons/VTIconExternalLink.vue'
import VTIconFacebook from '@vuetheme/core/components/icons/VTIconFacebook.vue'
import VTIconGitHub from '@vuetheme/core/components/icons/VTIconGitHub.vue'
import VTIconGlobe from '@vuetheme/core/components/icons/VTIconGlobe.vue'
import VTIconHeart from '@vuetheme/core/components/icons/VTIconHeart.vue'
import VTIconInstagram from '@vuetheme/core/components/icons/VTIconInstagram.vue'
import VTIconLanguages from '@vuetheme/core/components/icons/VTIconLanguages.vue'
import VTIconLink from '@vuetheme/core/components/icons/VTIconLink.vue'
import VTIconLinkedIn from '@vuetheme/core/components/icons/VTIconLinkedIn.vue'
import VTIconMail from '@vuetheme/core/components/icons/VTIconMail.vue'
import VTIconMapPin from '@vuetheme/core/components/icons/VTIconMapPin.vue'
import VTIconMoon from '@vuetheme/core/components/icons/VTIconMoon.vue'
import VTIconMoreHorizontal from '@vuetheme/core/components/icons/VTIconMoreHorizontal.vue'
import VTIconPlus from '@vuetheme/core/components/icons/VTIconPlus.vue'
import VTIconSearch from '@vuetheme/core/components/icons/VTIconSearch.vue'
import VTIconSlack from '@vuetheme/core/components/icons/VTIconSlack.vue'
import VTIconSun from '@vuetheme/core/components/icons/VTIconSun.vue'
import VTIconTwitter from '@vuetheme/core/components/icons/VTIconTwitter.vue'
import VTIconX from '@vuetheme/core/components/icons/VTIconX.vue'
import VTIconYouTube from '@vuetheme/core/components/icons/VTIconYouTube.vue'

const icons = {
  VTIconAlignJustify,
  VTIconAlignLeft,
  VTIconAlignRight,
  VTIconChevronDown,
  VTIconChevronLeft,
  VTIconChevronRight,
  VTIconChevronUp,
  VTIconCode,
  VTIconCodePen,
  VTIconCommand,
  VTIconDiscord,
  VTIconEdit,
  VTIconExternalLink,
  VTIconFacebook,
  VTIconGitHub,
  VTIconGlobe,
  VTIconHeart,
  VTIconInstagram,
  VTIconLanguages,
  VTIconLink,
  VTIconLinkedIn,
  VTIconMail,
  VTIconMapPin,
  VTIconMoon,
  VTIconMoreHorizontal,
  VTIconPlus,
  VTIconSearch,
  VTIconSlack,
  VTIconSun,
  VTIconTwitter,
  VTIconX,
  VTIconYouTube
}
</script>

<template>
  <div class="icon-showcase">
    <div v-for="(icon, name) in icons" :key="name" class="icon-wrapper">
      <component :is="icon" />
      <span class="icon-name">{{ name }}</span>
    </div>
  </div>
</template>

<style scoped>
.icon-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 24px;
}
.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--vt-c-divider);
  border-radius: 8px;
}
.icon-wrapper :deep(svg) {
  width: 24px;
  height: 24px;
  color: var(--vt-c-text-1);
}
.icon-name {
  font-size: 12px;
  color: var(--vt-c-text-2);
}
</style>
