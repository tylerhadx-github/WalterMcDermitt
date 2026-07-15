<template>
  <Teleport to="body">
    <Transition name="detail-backdrop">
      <div
        v-if="project"
        class="backdrop"
        @click.self="$emit('close')"
      >
        <Transition name="detail" appear>
          <div
            v-if="project"
            class="detail"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="`detail-title-${project.id}`"
          >
            <button class="close" type="button" aria-label="Close" @click="$emit('close')">
              ✕
            </button>

            <div class="detail-media">
              <div class="frame">
                <img
                  v-if="project.image"
                  :src="assetUrl(project.image)"
                  :alt="project.title"
                />
                <div v-else class="frame-placeholder">
                  <span>{{ project.placeholder }}</span>
                </div>
              </div>
            </div>

            <div class="detail-body">
              <div class="detail-meta">
                <span
                  class="badge badge-available"
                >
                  {{ project.status }}
                </span>
                <ul class="tags">
                  <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
                </ul>
              </div>

              <h2 :id="`detail-title-${project.id}`" class="detail-title">
                {{ project.title }}
              </h2>
              <p v-if="project.authors" class="detail-authors">by {{ project.authors }}</p>
              <p class="detail-tagline">{{ project.tagline }}</p>
              <p class="detail-desc">{{ project.description }}</p>

              <div class="detail-grid">
                <div>
                  <h3>The story</h3>
                  <p>{{ project.story }}</p>
                </div>
                <div>
                  <h3>About this book</h3>
                  <p>{{ project.about }}</p>
                </div>
              </div>

              <div class="detail-actions">
                <a
                  v-if="project.links?.buy"
                  class="btn btn-primary"
                  :href="project.links.buy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ project.links.buyLabel || 'Buy Print' }}
                </a>
                <a
                  v-if="project.links?.preview"
                  class="btn btn-ghost"
                  :href="project.links.preview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Flip preview
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.project,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
  },
)

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(5, 5, 8, 0.78);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  padding: 1.25rem;
  overflow-y: auto;
}

.detail {
  position: relative;
  width: min(100%, 920px);
  max-height: min(92vh, 900px);
  overflow: auto;
  background: var(--color-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-xl);
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.55);
}

.close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid var(--color-border);
  display: grid;
  place-items: center;
  font-size: 0.85rem;
  transition: background var(--duration-fast) var(--ease-soft);
}

.close:hover {
  background: var(--color-accent-soft);
}

.detail-media {
  padding: var(--space-lg);
  background: linear-gradient(180deg, #12121a, #0e0e14);
}

.frame {
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: #0a0a10;
}

.frame img {
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
  font-size: 3rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.25);
  background:
    radial-gradient(circle at 30% 20%, var(--color-accent-soft), transparent 55%),
    #101018;
}

.detail-body {
  padding: var(--space-lg);
  padding-top: 2.5rem;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: var(--space-sm);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.detail-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 0.25rem;
}

.detail-authors {
  color: var(--color-text-muted);
  font-style: italic;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.detail-tagline {
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
  font-weight: 500;
}

.detail-desc {
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.detail-grid {
  display: grid;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.detail-grid h3 {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-dim);
  margin-bottom: 0.4rem;
  font-family: var(--font-body);
  font-weight: 600;
}

.detail-grid p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

@media (max-width: 768px) {
  .detail {
    grid-template-columns: 1fr;
    max-height: none;
  }

  .frame {
    aspect-ratio: 16 / 10;
  }

  .detail-body {
    padding-top: var(--space-md);
  }
}
</style>
