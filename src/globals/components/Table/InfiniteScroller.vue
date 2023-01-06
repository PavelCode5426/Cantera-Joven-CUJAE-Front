<script setup lang="ts">
import { defineEmits, onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits(['entry'])
let observer

function handleIntersection(entry) {
  if (entry.isIntersecting)
    emit('entry')
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    handleIntersection(entries[0])
  })

  observer.observe(document.querySelector('.trigger'))
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<template>
  <span class="trigger">.</span>
</template>

