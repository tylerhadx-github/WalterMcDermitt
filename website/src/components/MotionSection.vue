<template>
  <section ref="root" class="motion-section" :class="{ 'is-ready': ready }">
    <slot />
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useMotion } from '../composables/useMotion'

const props = defineProps({
  animation: {
    type: String,
    default: 'fadeUp', // fadeUp | scaleIn | stagger
  },
  selector: {
    type: String,
    default: '[data-reveal]',
  },
  start: {
    type: String,
    default: 'top 85%',
  },
})

const root = useTemplateRef('root')
const ready = ref(false)
const { scrollReveal, reduceMotion, gsap } = useMotion()
let tween = null

onMounted(() => {
  const el = root.value
  if (!el) return

  const targets = el.querySelectorAll(props.selector)
  const nodes = targets.length ? targets : [el]

  if (reduceMotion.value) {
    gsap.set(nodes, { clearProps: 'all', opacity: 1 })
    ready.value = true
    return
  }

  const scale = props.animation === 'scaleIn' ? 0.94 : 1
  const stagger = props.animation === 'stagger' ? 0.12 : 0

  tween = scrollReveal(nodes, {
    trigger: el,
    start: props.start,
    scale: props.animation === 'scaleIn' ? scale : undefined,
    stagger,
  })

  ready.value = true
})

onUnmounted(() => {
  tween?.kill?.()
})
</script>

<style scoped>
.motion-section {
  position: relative;
}
</style>
