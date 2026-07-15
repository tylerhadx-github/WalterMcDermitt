<template>
  <div class="home">
    <nav class="nav" :class="{ scrolled: isScrolled }">
      <div class="container nav-inner">
        <a href="#" class="logo" @click.prevent="scrollTop">Family Stories</a>
        <div class="nav-links">
          <a href="#books">Books</a>
        </div>
      </div>
    </nav>

    <AnimatedHero />
    <ProjectShowcase />

    <footer class="footer">
      <div class="container footer-inner">
        <p>© {{ year }} Our Family · Children's Stories</p>
        <p class="footer-note">The Search For Walter McDermitt &amp; A Visit From My Brother</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import AnimatedHero from '../components/AnimatedHero.vue'
import ProjectShowcase from '../components/ProjectShowcase.vue'

const year = new Date().getFullYear()
const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  display: flex;
  align-items: center;
  transition:
    background var(--duration-fast) var(--ease-soft),
    border-color var(--duration-fast) var(--ease-soft),
    backdrop-filter var(--duration-fast) var(--ease-soft);
  border-bottom: 1px solid transparent;
}

.nav.scrolled {
  background: rgba(11, 11, 15, 0.82);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--color-border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 2.5rem, var(--max-width));
}

.logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: -0.03em;
  color: var(--color-text);
}

.nav-links {
  display: flex;
  gap: 1.25rem;
}

.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-soft);
}

.nav-links a:hover {
  color: var(--color-text);
}

.footer {
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-lg);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--color-text-dim);
  font-size: 0.85rem;
}

.footer-note {
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .nav-inner {
    width: min(100% - 1.5rem, var(--max-width));
  }

  .logo {
    font-size: 0.95rem;
  }
}
</style>
