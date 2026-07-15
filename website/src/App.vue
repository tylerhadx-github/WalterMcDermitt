<template>
  <div class="app-shell">
    <div class="grain" aria-hidden="true" />
    <HomeView />
  </div>
</template>

<script setup>
import HomeView from './views/HomeView.vue'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  position: relative;
}
</style>
