<script setup>
import ContributionGraph from '../../../../.vitepress/theme/components/ContributionGraph.vue'
</script>

<template>
  <div class="project-index">
    <header class="hero">
      <h1 class="title">GitHub Contributions Graph</h1>
      <p class="tagline">一个完全独立的 GitHub 风格贡献图组件。</p>

      <section class="action-section">
        <a class="action-button" href="./guide">查看集成教程 →</a>
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
  margin-top: 40px;
}

.action-button {
  display: inline-block;
  background-color: var(--vt-c-brand);
  color: var(--vt-c-bg);
  padding: 12px 32px;
  border-radius: 24px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.action-button:hover {
  opacity: 0.8;
  text-decoration: none;
}

@media (max-width: 768px) {
  .title {
    font-size: 40px;
  }
  .tagline {
    font-size: 18px;
  }
}
</style>
