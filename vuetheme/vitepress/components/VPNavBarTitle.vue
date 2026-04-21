<template>
  <a class="VPNavBarTitle" href="/">
    <slot name="navbar-title">
      <img class="logo" src="/logo.svg" alt="logo" width="24" height="24" />
      <span class="text">TiamatXu</span>
    </slot>
  </a>
</template>

<style scoped>
.VPNavBarTitle {
  display: flex;
  color: var(--vt-c-text-2);
  align-items: center;
  padding-top: 1px;
  height: var(--vt-nav-height);
  transition: opacity 0.25s;
}

.VPNavBarTitle:hover {
  opacity: 0.7;
}

.logo {
  position: relative;
}

.logo + .text {
  padding-left: 8px;
}

.text {
  font-size: 16px;
  font-weight: 500;
}
</style>
