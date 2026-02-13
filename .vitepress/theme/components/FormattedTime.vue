<template>
  <div v-if="formattedTime" class="formatted-time">
    {{ description }}: {{ formattedTime }}
    <span v-if="suffix" class="time-suffix">{{ suffix }}</span>
  </div>
  <div v-else class="formatted-time">{{ description }}: Fetch failed with no time.</div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, onMounted } from 'vue'
import { format } from 'date-fns'

const props = defineProps<{
  description: string
  timeValue: string | null | undefined
  formatString?: string
  suffix?: string
}>()

const { description, timeValue, formatString, suffix } = toRefs(props)
const formattedTime = ref('')

const defaultFullFormatString = "yyyy/MM/dd HH:mm:ss 'UTC'xxx"

const formatTime = () => {
  if (timeValue?.value) {
    try {
      const date = new Date(timeValue.value)
      formattedTime.value = format(date, formatString?.value || defaultFullFormatString)
    } catch (e) {
      formattedTime.value = 'Invalid date'
    }
  } else {
    formattedTime.value = ''
  }
}

onMounted(formatTime)
watch([timeValue, formatString], formatTime)
</script>

<style scoped>
.formatted-time {
  font-size: 0.8em;
  color: var(--vt-c-text-2);
}
</style>
