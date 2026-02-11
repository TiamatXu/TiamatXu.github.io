<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: number
}>()

const weatherIcons = {
  sunny: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" /><path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" /><path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l-.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" /></svg>`,
  cloudy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 10C19.3284 10 20 10.6716 20 11.5C20 12.3284 19.3284 13 18.5 13H7.5C5.01472 13 3 10.9853 3 8.5C3 6.01472 5.01472 4 7.5 4C9.14465 4 10.6002 4.8336 11.4999 6.125C12.3997 4.8336 13.8553 4 15.5 4C17.9853 4 20 6.01472 20 8.5C20 9.05228 19.7761 9.55228 19.3807 9.89443L18.5 10ZM18.5 10H19.3807C19.7761 9.55228 20 9.05228 20 8.5C20 6.01472 17.9853 4 15.5 4C13.8553 4 12.3997 4.8336 11.4999 6.125C10.6002 4.8336 9.14465 4 7.5 4C5.01472 4 3 6.01472 3 8.5C3 10.9853 5.01472 13 7.5 13H18.5Z" fill="currentColor"/></svg>`,
  rainy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16V16.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12V12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V8.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  snowy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-snow" viewBox="0 0 16 16"><path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.146.147a.5.5 0 0 1-.708-.708l.75-.75a.5.5 0 0 1 .708 0l.75.75a.5.5 0 0 1-.708.708L8.5 14.207V15.5a.5.5 0 0 1-.5.5zM8 0a.5.5 0 0 1 .5.5v1.293l.146-.147a.5.5 0 0 1 .708.708l-.75.75a.5.5 0 0 1-.708 0l-.75-.75a.5.5 0 0 1 .708-.708L7.5 1.793V.5a.5.5 0 0 1 .5-.5zM2.343 13.657a.5.5 0 0 1-.707 0L1.146 12.854a.5.5 0 0 1 0-.708l.75-.75a.5.5 0 0 1 .708.708l-.147.146h1.293a.5.5 0 0 1 0 1H2.854l.147.146a.5.5 0 0 1 0 .708zM13.657 2.343a.5.5 0 0 1 .707 0l.708.707a.5.5 0 0 1 0 .708l-.75.75a.5.5 0 0 1-.708-.708l.147-.146h-1.293a.5.5 0 0 1 0-1h1.293l-.147-.146a.5.5 0 0 1 0-.708zM4.207 8a.5.5 0 0 1-.708 0l-.75-.75a.5.5 0 0 1 0-.708l.75-.75a.5.5 0 0 1 .708.708L3.793 7.5H.5a.5.5 0 0 1 0 1h3.293l.147.146a.5.5 0 0 1 0-.708zM11.793 8a.5.5 0 0 1 .708 0l.75.75a.5.5 0 0 1 0 .708l-.75.75a.5.5 0 0 1-.708-.708L12.207 8.5H15.5a.5.5 0 0 1 0-1h-3.293l-.147-.146a.5.5 0 0 1 0 .708zM2.343 2.343a.5.5 0 0 1 0 .707l.707.708a.5.5 0 0 1 .708 0l.75-.75a.5.5 0 0 1-.708-.708l-.146-.147V.5a.5.5 0 0 1-1 0v1.293l-.146.147a.5.5 0 0 1 0 .708zM13.657 13.657a.5.5 0 0 1 0-.707l-.707-.708a.5.5 0 0 1-.708 0l-.75.75a.5.5 0 0 1 .708.708l.146.147v1.293a.5.5 0 0 1 1 0v-1.293l.146-.147a.5.5 0 0 1 0-.708z"/></svg>`,
  thunderstorm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 10c-1.1 0-2 .9-2 2s.9 2 2 2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4h-2c-1.1 0-2 .9-2 2z" /><path d="M9.5 15.5l-3 3-3-3" /><path d="M12 18l-3 3-3-3" /><path d="M17 10h-2c-1.1 0-2 .9-2 2s.9 2 2 2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z" /></svg>`,
};

const icon = computed(() => {
  const code = props.code;
  if ([0, 1].includes(code)) { // 晴朗, 主要晴朗
    return weatherIcons.sunny;
  }
  if ([2, 3].includes(code)) { // 部分多云, 阴天
    return weatherIcons.cloudy;
  }
  if ([45, 48].includes(code)) { // 雾
    return weatherIcons.cloudy;
  }
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) { // 毛毛雨, 雨
    return weatherIcons.rainy;
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) { // 雪
    return weatherIcons.snowy;
  }
  if ([95, 96, 99].includes(code)) { // 雷暴
    return weatherIcons.thunderstorm;
  }
  return weatherIcons.cloudy; // 默认
})
</script>

<template>
  <div class="weather-icon" v-html="icon"></div>
</template>

<style scoped>
.weather-icon {
  width: 64px;
  height: 64px;
  color: var(--vt-c-text-1);
}
.weather-icon:deep(svg) {
    width: 100%;
    height: 100%;
}
</style>
