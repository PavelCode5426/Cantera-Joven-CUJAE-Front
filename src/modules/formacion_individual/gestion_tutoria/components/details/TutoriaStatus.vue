<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  status: {
    type: Boolean,
    default: null,
    required: true,
  },
})
</script>

<template>
  <el-tag v-if="status" type="success">
    Confirmado
  </el-tag>
  <el-tag v-else type="danger">
    Revocado
  </el-tag>
</template>

<style scoped>

</style>
