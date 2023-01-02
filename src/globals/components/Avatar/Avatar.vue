<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps()

function errorHandler() {
  return true
}
</script>

<template>
  <el-avatar src="/assets/images/thumb-3.png" @error="errorHandler">
    <img :src="src">
  </el-avatar>
</template>
