<template>
  <h3>{{title}}</h3>
  <p>{{description}}</p>
  <br/>
</template>
<script setup lang="ts">
interface Props {
  title:string,
  description:{
    type:string,
    required:true
  }
}
const props = defineProps<Props>()
</script>