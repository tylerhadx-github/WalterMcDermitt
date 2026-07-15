<template>
  <article
    class="panel"
    :class="[`accent-${project.accent || 'purple'}`, { featured: project.featured }]"
    role="button"
    tabindex="0"
    @click="$emit('select', project)"
    @keydown.enter.space.prevent="$emit('select', project)"
  >
    <div class="panel-media">
      <div class="frame">
        <img
          v-if="project.image"
          :src="assetUrl(project.image)"
          :alt="`${project.title} cover`"
          class="frame-img"
        />
        <div v-else class="frame-placeholder">
          <span>{{ project.placeholder || project.title.slice(0, 2) }}</span>
        </div>
        <div class="frame-gloss" aria-hidden="true" />
      </div>
    </div>

    <div class="panel-body">
      <div class="panel-meta">
        <span
          class="badge"
          :class="{
            'badge-live': project.status === 'Live',
            'badge-available': project.status === 'Available',
          }"
        >
          {{ project.status }}
        </span>
        <ul class="tags">
          <li v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</li>
        </ul>
      </div>

      <h3 class="panel-title">{{ project.title }}</h3>
      <p v-if="project.authors" class="panel-authors">by {{ project.authors }}</p>
      <p class="panel-tagline">{{ project.tagline }}</p>

      <div class="panel-footer">
        <span class="panel-cta">Open book</span>
        <span class="panel-arrow" aria-hidden="true">→</span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})

defineEmits(['select'])

function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
</script>

<style scoped>
.panel {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: var(--space-lg);
  align-items: center;
  padding: var(--space-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition:
    transform var(--duration-med) var(--ease-out),
    border-color var(--duration-fast) var(--ease-soft),
    box-shadow var(--duration-med) var(--ease-out);
}

.panel:hover,
.panel:focus-visible {
  transform: translateY(-6px) scale(1.01);
  border-color: rgba(168, 85, 247, 0.45);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45), 0 0 40px var(--color-accent-soft);
  outline: none;
}

.accent-cyan:hover,
.accent-cyan:focus-visible {
  border-color: rgba(34, 211, 238, 0.45);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45), 0 0 40px var(--color-cyan-soft);
}

.panel-media {
  min-width: 0;
}

.frame {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(145deg, #1a1a24, #101018 60%, #1e1230);
  border: 1px solid var(--color-border-strong);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 16px 40px rgba(0, 0, 0, 0.35);
}

.frame-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.frame-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.28);
  background:
    radial-gradient(circle at 30% 20%, var(--color-accent-soft), transparent 50%),
    radial-gradient(circle at 80% 80%, var(--color-cyan-soft), transparent 45%);
}

.accent-cyan .frame-placeholder {
  background:
    radial-gradient(circle at 30% 20%, var(--color-cyan-soft), transparent 50%),
    radial-gradient(circle at 80% 80%, var(--color-accent-soft), transparent 45%);
}

.frame-gloss {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 40%);
  pointer-events: none;
}

.panel-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--space-sm);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.panel-title {
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  margin-bottom: 0.35rem;
}

.panel-authors {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.panel-tagline {
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
  font-size: 1rem;
}

.panel-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.9rem;
}

.accent-cyan .panel-footer {
  color: var(--color-cyan);
}

.panel-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}

.panel:hover .panel-arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .panel {
    grid-template-columns: 1fr;
    gap: var(--space-md);
    padding: var(--space-md);
  }

  .panel:hover,
  .panel:focus-visible {
    transform: translateY(-3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel:hover,
  .panel:focus-visible {
    transform: none;
  }
}
</style>
