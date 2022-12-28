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
  <el-tag v-if="status == null" type="info">
    Pendiente
  </el-tag>
  <el-tag v-else-if="status" type="success">
    Aceptada
  </el-tag>
  <el-tag v-else type="danger">
    Rechazada
  </el-tag>
</template>

<style scoped>

</style>
