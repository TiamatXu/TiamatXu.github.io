<script setup>
import VTIconAlignJustify from '../../../src/core/components/icons/VTIconAlignJustify.vue'
import VTIconAlignLeft from '../../../src/core/components/icons/VTIconAlignLeft.vue'
import VTIconAlignRight from '../../../src/core/components/icons/VTIconAlignRight.vue'
import VTIconChevronDown from '../../../src/core/components/icons/VTIconChevronDown.vue'
import VTIconChevronLeft from '../../../src/core/components/icons/VTIconChevronLeft.vue'
import VTIconChevronRight from '../../../src/core/components/icons/VTIconChevronRight.vue'
import VTIconChevronUp from '../../../src/core/components/icons/VTIconChevronUp.vue'
import VTIconCode from '../../../src/core/components/icons/VTIconCode.vue'
import VTIconCodePen from '../../../src/core/components/icons/VTIconCodePen.vue'
import VTIconCommand from '../../../src/core/components/icons/VTIconCommand.vue'
import VTIconDiscord from '../../../src/core/components/icons/VTIconDiscord.vue'
import VTIconEdit from '../../../src/core/components/icons/VTIconEdit.vue'
import VTIconExternalLink from '../../../src/core/components/icons/VTIconExternalLink.vue'
import VTIconFacebook from '../../../src/core/components/icons/VTIconFacebook.vue'
import VTIconGitHub from '../../../src/core/components/icons/VTIconGitHub.vue'
import VTIconGlobe from '../../../src/core/components/icons/VTIconGlobe.vue'
import VTIconHeart from '../../../src/core/components/icons/VTIconHeart.vue'
import VTIconInstagram from '../../../src/core/components/icons/VTIconInstagram.vue'
import VTIconLanguages from '../../../src/core/components/icons/VTIconLanguages.vue'
import VTIconLink from '../../../src/core/components/icons/VTIconLink.vue'
import VTIconLinkedIn from '../../../src/core/components/icons/VTIconLinkedIn.vue'
import VTIconMail from '../../../src/core/components/icons/VTIconMail.vue'
import VTIconMapPin from '../../../src/core/components/icons/VTIconMapPin.vue'
import VTIconMoon from '../../../src/core/components/icons/VTIconMoon.vue'
import VTIconMoreHorizontal from '../../../src/core/components/icons/VTIconMoreHorizontal.vue'
import VTIconPlus from '../../../src/core/components/icons/VTIconPlus.vue'
import VTIconSearch from '../../../src/core/components/icons/VTIconSearch.vue'
import VTIconSlack from '../../../src/core/components/icons/VTIconSlack.vue'
import VTIconSun from '../../../src/core/components/icons/VTIconSun.vue'
import VTIconTwitter from '../../../src/core/components/icons/VTIconTwitter.vue'
import VTIconX from '../../../src/core/components/icons/VTIconX.vue'
import VTIconYouTube from '../../../src/core/components/icons/VTIconYouTube.vue'

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
