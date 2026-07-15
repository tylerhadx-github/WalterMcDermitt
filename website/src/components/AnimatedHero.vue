<template>
  <header class="hero" ref="heroRoot">
    <div class="hero-glow" aria-hidden="true" />
    <div class="hero-hints" aria-hidden="true">
      <span
        v-for="(hint, i) in hints"
        :key="hint"
        ref="hintEls"
        class="hint"
        :style="{ '--i': i }"
      >
        {{ hint }}
      </span>
    </div>

    <div class="container hero-inner">
      <p ref="labelEl" class="section-label">Family Stories</p>

      <h1 class="hero-title" aria-label="Stories our family tells.">
        <span
          v-for="(word, i) in titleWords"
          :key="i"
          ref="wordEls"
          class="word"
        >
          {{ word }}
        </span>
      </h1>

      <p ref="subEl" class="hero-sub">
        Original children's books written by our family — fishing legends, Christmas
        visits, and stories made to be read aloud.
      </p>

      <div ref="ctaEl" class="hero-ctas">
        <a class="btn btn-primary" href="#books">See the Books</a>
      </div>
    </div>

    <div class="scroll-cue" aria-hidden="true">
      <span>Scroll</span>
      <div class="scroll-line" />
    </div>
  </header>
</template>

<script setup>
import { onMounted, useTemplateRef } from 'vue'
import { useMotion } from '../composables/useMotion'

const titleWords = ['Stories', 'our', 'family', 'tells.']
const hints = ['Walter', 'Steven', 'Christmas', 'Walleye', 'Family', 'Stories']

const heroRoot = useTemplateRef('heroRoot')
const labelEl = useTemplateRef('labelEl')
const wordEls = useTemplateRef('wordEls')
const subEl = useTemplateRef('subEl')
const ctaEl = useTemplateRef('ctaEl')
const hintEls = useTemplateRef('hintEls')

const { heroTimeline, floatHints } = useMotion()

onMounted(() => {
  heroTimeline({
    label: labelEl.value,
    words: wordEls.value,
    sub: subEl.value,
    ctas: ctaEl.value?.querySelectorAll('.btn'),
    hints: hintEls.value,
  })

  floatHints(hintEls.value)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  padding-block: calc(var(--header-height) + 2rem) 4rem;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -20%;
  left: 50%;
  translate: -50% 0;
  width: min(90vw, 720px);
  height: min(90vw, 720px);
  background: radial-gradient(circle, var(--color-accent-glow) 0%, transparent 65%);
  filter: blur(40px);
  opacity: 0.55;
  pointer-events: none;
}

.hero-hints {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hint {
  position: absolute;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.25rem, 3vw, 2rem);
  color: var(--color-text);
  opacity: 0.12;
  letter-spacing: -0.02em;
}

.hint:nth-child(1) { top: 18%; left: 8%; }
.hint:nth-child(2) { top: 28%; right: 10%; }
.hint:nth-child(3) { bottom: 28%; left: 12%; }
.hint:nth-child(4) { top: 55%; right: 18%; }
.hint:nth-child(5) { bottom: 18%; right: 8%; }
.hint:nth-child(6) { top: 40%; left: 22%; }

.hero-inner {
  position: relative;
  z-index: 1;
  padding-top: 2rem;
}

.hero-title {
  font-size: clamp(2.75rem, 8vw, 5.5rem);
  font-weight: 800;
  margin-bottom: var(--space-lg);
  max-width: 14ch;
}

.word {
  display: inline-block;
  margin-right: 0.28em;
}

.word:nth-child(3),
.word:nth-child(4) {
  color: var(--color-accent);
}

.hero-sub {
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: var(--color-text-muted);
  max-width: 36rem;
  margin-bottom: var(--space-lg);
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.scroll-cue {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  translate: -50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-dim);
}

.scroll-line {
  width: 1px;
  height: 2.5rem;
  background: linear-gradient(to bottom, var(--color-accent), transparent);
  animation: pulse-line 2s ease-in-out infinite;
}

@keyframes pulse-line {
  0%,
  100% { opacity: 0.35; transform: scaleY(0.85); }
  50% { opacity: 1; transform: scaleY(1); }
}

@media (max-width: 768px) {
  .hero-hints {
    display: none;
  }

  .hero-title {
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-line {
    animation: none;
  }
}
</style>
