<script setup lang="ts">
import SiteMap from './SiteMap.vue'
import ContributionGraph from './ContributionGraph.vue'
import FormattedTime from './FormattedTime.vue'
// import ITab from './ITab.vue'

const githubUsername = 'TiamatXu'
const buildTime = import.meta.env.VITE_APP_BUILD_TIME
const runningDays = Math.floor((new Date().getTime() - new Date('2025-12-25').getTime()) / (1000 * 60 * 60 * 24))
</script>

<template>
  <section id="time-tag">
    <div class="time-tag-content">
      <FormattedTime description="创建于" timeValue="2025-12-25" formatString="yyyy/MM/dd" :suffix="`(已运行 ${runningDays} 天)`" />
      <FormattedTime description="最后部署于" :timeValue="buildTime" formatString="yyyy/MM/dd HH:mm:ss 'UTC'xxx" />
    </div>
  </section>
  <section id="hero">
    <h1 class="tagline">
      <span class="accent">Tiamat Xu</span>
      <br />的个人文档库
    </h1>
    <p class="description">一个开发者的个人知识库，在这里记录并分享我的学习与实践。</p>
  </section>

  <!--  <section id="itab">-->
  <!--    <ITab />-->
  <!--  </section>-->

  <!--  <section id="highlights" class="vt-box-container">-->
  <!--    <div class="vt-box">-->
  <!--      <h2>易学易用</h2>-->
  <!--      <p>基于标准 HTML、CSS 和 JavaScript 构建，提供容易上手的 API 和一流的文档。</p>-->
  <!--    </div>-->
  <!--    <div class="vt-box">-->
  <!--      <h2>性能出色</h2>-->
  <!--      <p>经过编译器优化、完全响应式的渲染系统，几乎不需要手动优化。</p>-->
  <!--    </div>-->
  <!--    <div class="vt-box">-->
  <!--      <h2>灵活多变</h2>-->
  <!--      <p>丰富的、可渐进式集成的生态系统，可以根据应用规模在库和框架间切换自如。</p>-->
  <!--    </div>-->
  <!--  </section>-->

  <!--  <section id="sponsors">-->
  <!--    <h2>Platinum Sponsors</h2>-->
  <!--    <SponsorsGroup tier="platinum" placement="landing"/>-->
  <!--    <h2>Gold Sponsors</h2>-->
  <!--    <SponsorsGroup tier="gold" placement="landing"/>-->
  <!--  </section>-->

  <section id="contribution-chart">
    <h2>GitHub Contribution Activity</h2>
    <ContributionGraph :github-username="githubUsername" />
  </section>

  <SiteMap />
</template>

<style scoped>
section {
  padding: 42px 32px;
}

#time-tag {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
  padding: 0 12px 0 24px;
}

@media (min-width: 768px) {
  #time-tag {
    padding: 0 12px 0 32px;
  }
}

@media (min-width: 1280px) {
  #time-tag {
    padding: 0 32px;
  }
}

/* Inner container: handles max-width, centering, and flex layout for content */
.time-tag-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--vp-screen-max-width);
}

#hero {
  padding-top: 72px;
  position: relative;
  text-align: center;
}

.tagline {
  font-size: 56px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0 auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.actions a {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vt-c-bg-mute);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition:
    background-color 0.5s,
    color 0.5s;
}

.actions .get-started,
.actions .setup {
  margin-right: 18px;
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover {
  transition-duration: 0.2s;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

.actions .get-started,
.actions .setup {
  color: var(--vt-c-text-code);
}

.actions .get-started:hover,
.actions .setup:hover {
  background-color: var(--vt-c-gray-light-4);
  transition-duration: 0.2s;
}

.dark .actions .get-started:hover,
.dark .actions .setup:hover {
  background-color: var(--vt-c-gray-dark-3);
}

.actions .get-started {
  font-size: 16px;
  display: inline-block;
  border-radius: 8px;
  transition:
    background-color 0.5s,
    color 0.5s;
  position: relative;
  font-weight: 600;
  background-color: var(--vt-c-green);
  color: #fff;
  margin-right: 18px;
  padding: 8px 1em;
}

.dark .actions .get-started {
  color: var(--vt-c-indigo);
}

.actions .get-started:hover {
  background-color: var(--vt-c-green-dark);
  transition-duration: 0.2s;
}

.dark .actions .get-started:hover {
  background-color: var(--vt-c-green-light);
}

#highlights {
  max-width: 960px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

#sponsors {
  max-width: 900px;
  margin: 0px auto;
}

#sponsors h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }
  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }
  #highlights h2 {
    margin-bottom: 0.6em;
  }
  #highlights .vt-box {
    padding: 20px 36px;
  }
  .actions a {
    margin: 18px 0;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}

#contribution-chart {
  text-align: center;
}

#contribution-chart h2 {
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
  font-size: 20px;
  font-weight: 600;
}
</style>
