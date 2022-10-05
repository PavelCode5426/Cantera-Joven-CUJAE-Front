<script setup lang="ts">
withDefaults(defineProps<Props>(), {
  fontSize: 15,
  textClass: 'text-white',
})
export interface Props {
  fontSize?: number
  textClass?: string
}
</script>

<template>
  <i class="fa fa-spinner rotation-animation loading" :class="textClass" :style="{ 'font-size': `${fontSize}px` }" />
</template>
