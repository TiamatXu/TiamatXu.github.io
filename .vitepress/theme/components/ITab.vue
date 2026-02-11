<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import WeatherIcon from './WeatherIcon.vue'

// --- Geolocation and Weather ---
const weather = ref<any>(null)
const sunrise = ref('')
const sunset = ref('')
const locationError = ref('')
// WMO 天气解释代码可以在 Open-Meteo 文档中找到，用于将代码映射为文本/图标
// 映射已经在 WeatherIcon.vue 组件中完成
const weatherDescription = computed(() => {
  if (!weather.value) return ''
  const code = weather.value.weathercode
  if ([0, 1].includes(code)) return '晴'
  if ([2].includes(code)) return '少云'
  if ([3].includes(code)) return '阴'
  if ([45, 48].includes(code)) return '雾'
  if (code >= 51 && code <= 67) return '雨'
  if (code >= 71 && code <= 77) return '雪'
  if (code >= 80 && code <= 82) return '阵雨'
  if (code >= 95) return '雷暴'
  return '未知'
})

// --- Calendar ---
const currentDate = new Date()
const dateString = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
const dayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currentDate.getDay()]

// --- Search ---
const searchQuery = ref('')
const searchEngines = [
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.283 10.356h-8.327v4.348h4.792c-.446 2.193-2.313 3.45-4.792 3.45-2.827 0-5.12-2.35-5.12-5.22s2.293-5.22 5.12-5.22c1.636 0 2.962.666 3.638 1.29l3.438-3.438A9.745 9.745 0 0 0 11.956 2C6.453 2 2 6.453 2 12s4.453 10 9.956 10c5.337 0 9.617-4.252 9.617-9.844 0-.687-.06-1.336-.172-1.956z"/></svg>`
  },
  {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m10.369 5.31-6.13 2.597v10.876l6.13-2.602v-10.87zM4.01 7.398l5.86-2.48v10.36l-5.86 2.48zM10.869 19.427l-6.13 2.596V11.13l6.13-2.601zm-5.86.51l5.86-2.481V8.1l-5.86 2.481zM11.339 4.347l6.13-2.6L24 4.54l-6.13 2.6zM11.569 22.02l6.13-2.597L24 22.21l-6.13 2.6zM18.139 7.977l5.86-2.48v13.09l-5.86 2.48z"/></svg>`
  },
  {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q=',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm-3.337 13.562c-.938 0-1.703-.766-1.703-1.703s.765-1.703 1.703-1.703 1.703.766 1.703 1.703-.766 1.703-1.703 1.703zm3.337-3.406c-1.875 0-3.406 1.531-3.406 3.406s1.531 3.406 3.406 3.406 3.406-1.531 3.406-3.406-1.531-3.406-3.406-3.406zm3.328-1.703c-.937 0-1.703-.766-1.703-1.703s.766-1.703 1.703-1.703 1.703.766 1.703 1.703-.766 1.703-1.703 1.703z"/></svg>`
  },
  {
    name: 'GitHub',
    url: 'https://github.com/search?q=',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`
  }
]
const selectedSearchEngine = ref(searchEngines[0])

function performSearch() {
  if (searchQuery.value.trim()) {
    window.open(selectedSearchEngine.value.url + encodeURIComponent(searchQuery.value), '_blank')
  }
}

// --- Developer Links ---
const devLinks = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Vite', url: 'https://vitejs.dev/' },
  { name: 'Vue.js', url: 'https://vuejs.org/' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/' },
  { name: 'MDN', url: 'https://developer.mozilla.org/' },
  { name: '掘金', url: 'https://juejin.cn/' }
  // 您可以在此处添加更多链接
]

// --- Lifecycle ---
onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          // 使用 Open-Meteo 获取天气，非商业用途无需 API 密钥。
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=sunrise,sunset&timezone=auto`
          )
          if (!response.ok) {
            throw new Error('天气数据请求失败')
          }
          const data = await response.json()
          weather.value = data.current_weather
          sunrise.value = new Date(data.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          sunset.value = new Date(data.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } catch (error) {
          locationError.value = '无法获取天气信息。'
          console.error(error)
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          locationError.value = '您已拒绝地理位置访问。'
        } else {
          locationError.value = '无法获取您的位置。'
        }
        console.error(error)
      }
    )
  } else {
    locationError.value = '您的浏览器不支持地理位置。'
  }
})
</script>

<template>
  <div class="itab-container">
    <div class="itab-main">
      <div class="search-wrapper">
        <div class="search-engines">
          <button
            v-for="engine in searchEngines"
            :key="engine.name"
            :class="{ active: selectedSearchEngine.name === engine.name }"
            @click="selectedSearchEngine = engine"
            class="engine-btn"
            :title="engine.name"
            v-html="engine.icon"
          ></button>
        </div>
        <input
          type="text"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          :placeholder="`在 ${selectedSearchEngine.name} 中搜索...`"
          class="search-input"
        />
        <button @click="performSearch" class="search-btn">
          <span>搜索</span>
        </button>
      </div>

      <div class="widgets-wrapper">
        <div class="widget weather-widget">
          <div class="widget-title">天气</div>
          <template v-if="weather">
            <div class="weather-content">
              <WeatherIcon :code="weather.weathercode" />
              <div class="temperature">{{ weather.temperature }}°C</div>
            </div>
            <div class="weather-description">{{ weatherDescription }}</div>
            <div class="sun-times">
              <span>日出: {{ sunrise }}</span>
              <span>日落: {{ sunset }}</span>
            </div>
          </template>
          <template v-else-if="locationError">
            <div class="error-message">{{ locationError }}</div>
          </template>
          <template v-else>
            <div>正在加载天气...</div>
          </template>
        </div>

        <div class="widget calendar-widget">
          <div class="widget-title">日历</div>
          <div class="date">{{ dateString }}</div>
          <div class="day">{{ dayOfWeek }}</div>
        </div>
      </div>

      <div class="links-wrapper">
        <a v-for="link in devLinks" :key="link.name" :href="link.url" target="_blank" class="dev-link">
          <span class="link-name">{{ link.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.itab-container {
  padding: 24px;
  background: transparent;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.itab-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://source.unsplash.com/random/1920x1080?nature,water,landscape');
  background-size: cover;
  background-position: center;
  filter: blur(10px) brightness(0.8);
  z-index: 1;
  transform: scale(1.1);
}

.dark .itab-container::before {
  background-image: url('https://source.unsplash.com/random/1920x1080?night,stars,galaxy');
  filter: blur(10px) brightness(0.6);
}

.itab-main {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(1.5);
  -webkit-backdrop-filter: blur(12px) saturate(1.5);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 800px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .itab-main {
  background: rgba(28, 28, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-wrapper {
  display: flex;
  margin-bottom: 32px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.dark .search-wrapper {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-engines {
  display: flex;
}

.engine-btn {
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.3s;
  color: var(--vt-c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.engine-btn:deep(svg) {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.engine-btn:hover:deep(svg) {
  opacity: 1;
}

.engine-btn.active {
  background: rgba(255, 255, 255, 0.2);
}

.engine-btn.active:deep(svg) {
  opacity: 1;
  color: var(--vt-c-text-1);
}

.search-input {
  flex-grow: 1;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  background: transparent;
  color: var(--vt-c-text-1);
}
.search-input:focus {
  outline: none;
}

.search-btn {
  padding: 0 20px;
  border: none;
  background: var(--vt-c-brand-light);
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.search-btn:hover {
  background: var(--vt-c-brand);
}
.dark .search-btn {
  background: var(--vt-c-brand);
}
.dark .search-btn:hover {
  background: var(--vt-c-brand-dark);
}

.widgets-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.widget {
  background: transparent;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.widget-title {
  font-size: 0.9em;
  font-weight: 500;
  color: var(--vt-c-text-3);
  margin-bottom: 16px;
  text-align: left;
}

.weather-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 8px;
}
.weather-widget .temperature {
  font-size: 2.5em;
  font-weight: 300;
  color: var(--vt-c-text-1);
  line-height: 1;
}

.weather-description {
  font-size: 1.2em;
  font-weight: 500;
  color: var(--vt-c-text-1);
  margin-bottom: 12px;
}

.sun-times {
  display: flex;
  justify-content: space-around;
  font-size: 0.9em;
  color: var(--vt-c-text-2);
}

.calendar-widget .date {
  font-size: 2.2em;
  font-weight: 300;
  color: var(--vt-c-text-1);
}

.calendar-widget .day {
  font-size: 1.2em;
  color: var(--vt-c-text-2);
  margin-top: 8px;
}

.links-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
}

.dev-link {
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: var(--vt-c-text-1);
  font-weight: 500;
  transition:
    background-color 0.3s,
    transform 0.2s;
  backdrop-filter: blur(2px);
}

.dark .dev-link {
  background: rgba(0, 0, 0, 0.2);
}

.dev-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
.dark .dev-link:hover {
  background: rgba(0, 0, 0, 0.4);
}

.error-message {
  color: var(--vt-c-red);
}
</style>
