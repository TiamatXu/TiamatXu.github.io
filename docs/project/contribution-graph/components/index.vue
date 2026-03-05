<script setup>
import ContributionGraph from '@customtheme/components/ContributionGraph.vue'
</script>

<template>
  <div class="project-index">
    <header class="hero">
      <h1 class="title">GitHub Contributions Graph</h1>
      <p class="tagline">一个完全独立的 GitHub 风格贡献图组件。</p>

      <section class="action-section">
        <a class="action-button" href="./guide">
          集成教程
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24">
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </a>
        <a class="github-repo" href="https://github.com/TiamatXu/github-contributions-graph" target="_blank">
          GitHub Repo
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
            />
          </svg>
        </a>
      </section>

      <section class="features">
        <div class="container">
          <div class="grid">
            <div class="item">
              <h2>暗黑模式支持</h2>
              <p>完美适配系统深色/浅色偏好，支持通过类名手动切换主题颜色。</p>
            </div>
            <div class="item">
              <h2>无 API 限制</h2>
              <p>自带数据抓取脚本，通过爬取 HTML 获取公开贡献数据，无需 GitHub API Token。</p>
            </div>
            <div class="item">
              <h2>交互友好</h2>
              <p>内置精准的 Tooltip 提示，支持点击跳转到对应日期的 GitHub 详情页。</p>
            </div>
          </div>
        </div>
      </section>
    </header>

    <section id="demo">
      <h2>Demo</h2>
      <ContributionGraph githubUsername="TiamatXu"></ContributionGraph>
    </section>
  </div>
</template>

<style scoped>
.project-index {
  padding: 40px 20px;
  max-width: 970px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 48px 0;
}

.title {
  font-size: 45px;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: -1.5px;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.tagline {
  font-size: 20px;
  color: var(--vt-c-text-2);
  margin: 24px auto 0;
  max-width: 700px;
}

#demo {
  text-align: center;
  display: block;
  justify-content: center;
  background-color: inherit;
}

#demo h2 {
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
  font-size: 20px;
  font-weight: 600;
}

.features {
  padding: 58px 58px;
  border-bottom: 1px solid var(--vt-c-divider-light);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
}

.item h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vt-c-brand);
  border: none;
  padding: 0;
}

.item p {
  color: var(--vt-c-text-2);
  line-height: 1.6;
}

.action-section {
  text-align: center;
  margin-top: 30px;
}

/* Base button styles */
.action-button,
.github-repo {
  font-size: 16px;
  display: inline-block;
  border-radius: 24px;
  transition: background-color 0.5s, color 0.5s;
  position: relative;
  font-weight: 600;
  padding: 8px 18px;
  text-decoration: none;
}

.action-button {
  background-color: var(--vt-c-green);
  color: #fff;
  margin-right: 18px;
}

.dark .action-button {
  color: var(--vt-c-indigo);
}

.action-button:hover {
  background-color: var(--vt-c-green-dark);
  transition-duration: 0.2s;
}

.dark .action-button:hover {
  background-color: var(--vt-c-green-light);
}

.github-repo {
  font-weight: 500;
  background: linear-gradient(var(--vt-c-bg-mute), var(--vt-c-bg-mute)) padding-box,
              linear-gradient(45deg, #42d392, #647eff) border-box;
  border: 2px solid transparent;
  color: var(--vt-c-text-code);
}

.github-repo:hover {
  background: linear-gradient(var(--vt-c-gray-light-4), var(--vt-c-gray-light-4)) padding-box,
              linear-gradient(45deg, #42d392, #647eff) border-box;
  transition-duration: 0.2s;
}

.dark .github-repo:hover {
  background: linear-gradient(var(--vt-c-gray-dark-3), var(--vt-c-gray-dark-3)) padding-box,
              linear-gradient(45deg, #42d392, #647eff) border-box;
}

.action-button .icon,
.github-repo .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.github-repo .icon {
  width: 12px;
  height: 12px;
  margin-left: 4px;
}

.action-button:hover .icon {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .title {
    font-size: 40px;
  }
  .tagline {
    font-size: 18px;
  }
  .action-button {
    margin-right: 18px;
  }
}
</style>
