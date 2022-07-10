<template>
  <h3>{{listTitle}}</h3>
  <p>{{listDescription}}</p>
</template>
<script setup lang="ts">
interface Props {
  listTitle:string,
  listDescription:string
}
const props = defineProps<Props>()
</script>