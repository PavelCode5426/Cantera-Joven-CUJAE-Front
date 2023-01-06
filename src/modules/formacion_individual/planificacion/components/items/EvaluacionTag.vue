<script setup lang="ts">
import { defineProps } from 'vue'

interface Prop {
  value: boolean
}
defineProps<Prop>()
</script>

<template>
  <el-tag v-if="value" type="success">
    Satisfactorio
  </el-tag>
  <el-tag v-else type="danger">
    No Satisfactorio
  </el-tag>
</template>

<style scoped>

</style>
