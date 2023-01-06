<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps()
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now()
}
</script>

<template>
  <el-date-picker :disabled-date="disabledDate" />
</template>
