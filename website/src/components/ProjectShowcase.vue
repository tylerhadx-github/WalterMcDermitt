<template>
  <section id="books" class="section showcase" ref="sectionRoot">
    <div class="container">
      <MotionSection animation="fadeUp">
        <p data-reveal class="section-label">Our Books</p>
        <h2 data-reveal class="section-title">Two stories, made by family</h2>
        <p data-reveal class="section-lead">
          Two original children's books from our family — click any cover to read more,
          flip through a preview, or order a printed copy.
        </p>
      </MotionSection>

      <div class="panels" ref="panelsRoot">
        <ProjectPanel
          v-for="book in books"
          :key="book.id"
          :project="book"
          data-reveal
          class="panel-item"
          @select="selected = $event"
        />
      </div>
    </div>

    <ProjectDetail :project="selected" @close="selected = null" />
  </section>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { books } from '../data/projects'
import { useMotion } from '../composables/useMotion'
import MotionSection from './MotionSection.vue'
import ProjectPanel from './ProjectPanel.vue'
import ProjectDetail from './ProjectDetail.vue'

const selected = ref(null)
const panelsRoot = useTemplateRef('panelsRoot')
const { scrollReveal } = useMotion()

onMounted(() => {
  const items = panelsRoot.value?.querySelectorAll('.panel-item')
  if (items?.length) {
    scrollReveal(items, {
      trigger: panelsRoot.value,
      start: 'top 80%',
      stagger: 0.15,
      scale: 0.97,
    })
  }
})
</script>

<style scoped>
.showcase {
  background:
    radial-gradient(ellipse at top, rgba(168, 85, 247, 0.06), transparent 50%),
    var(--color-base);
}

.section-lead {
  margin-bottom: var(--space-xl);
}

.panels {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

@media (min-width: 900px) {
  .panels > :nth-child(even) {
    direction: rtl;
  }

  .panels > :nth-child(even) :deep(.panel-body) {
    direction: ltr;
  }
}
</style>
