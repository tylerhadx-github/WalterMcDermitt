import { usePreferredReducedMotion, useMediaQuery } from '@vueuse/core'
import { computed, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
}

export function useMotion() {
  ensureGsap()

  const prefersReduced = usePreferredReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const reduceMotion = computed(() => prefersReduced.value === true)

  const contexts = []

  function createContext() {
    const ctx = gsap.context(() => {})
    contexts.push(ctx)
    return ctx
  }

  function fadeUp(targets, options = {}) {
    if (reduceMotion.value) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return null
    }

    const defaults = {
      y: isMobile.value ? 24 : 40,
      opacity: 0,
      duration: isMobile.value ? 0.5 : 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      ...options,
    }

    return gsap.from(targets, defaults)
  }

  function scrollReveal(targets, options = {}) {
    if (reduceMotion.value) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1 })
      return null
    }

    const {
      trigger,
      start = 'top 85%',
      y = isMobile.value ? 28 : 48,
      scale = isMobile.value ? 1 : 0.96,
      stagger = 0.12,
      scrub = false,
      ...rest
    } = options

    return gsap.from(targets, {
      y,
      scale,
      opacity: 0,
      duration: isMobile.value ? 0.55 : 0.85,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        toggleActions: scrub ? undefined : 'play none none none',
        scrub: scrub || false,
      },
      ...rest,
    })
  }

  function heroTimeline(elements) {
    if (reduceMotion.value) {
      gsap.set(Object.values(elements).flat().filter(Boolean), { opacity: 1, y: 0 })
      return null
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (elements.label) {
      tl.from(elements.label, { opacity: 0, y: 16, duration: 0.5 })
    }
    if (elements.words?.length) {
      tl.from(elements.words, { opacity: 0, y: 40, duration: 0.7, stagger: 0.08 }, '-=0.2')
    }
    if (elements.sub) {
      tl.from(elements.sub, { opacity: 0, y: 24, duration: 0.55 }, '-=0.35')
    }
    if (elements.ctas) {
      tl.from(elements.ctas, { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.3')
    }
    if (elements.hints?.length && !isMobile.value) {
      tl.from(
        elements.hints,
        { opacity: 0, y: 20, duration: 1, stagger: 0.15, ease: 'power2.out' },
        '-=0.5',
      )
    }

    return tl
  }

  function floatHints(hints) {
    if (reduceMotion.value || isMobile.value || !hints?.length) return

    hints.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -18 : 14,
        x: i % 2 === 0 ? 10 : -8,
        duration: 4 + i * 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      })
    })
  }

  onUnmounted(() => {
    contexts.forEach((ctx) => ctx.revert())
    ScrollTrigger.getAll().forEach((t) => t.kill())
  })

  return {
    gsap,
    ScrollTrigger,
    reduceMotion,
    isMobile,
    fadeUp,
    scrollReveal,
    heroTimeline,
    floatHints,
    createContext,
  }
}
