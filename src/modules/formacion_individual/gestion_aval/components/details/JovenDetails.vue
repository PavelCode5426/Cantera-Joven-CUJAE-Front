<script setup lang="ts">
import { defineProps } from 'vue'
import type { JovenModel } from '../../../../../backed_services/models/joven.model'

interface Props {
  joven: JovenModel
}
const props = defineProps<Props>()
</script>

<template>
  <el-descriptions>
    <el-avatar size="large" />
    <el-descriptions-item label="Nombre">
      {{ joven?.first_name }}
    </el-descriptions-item>
    <el-descriptions-item label="Apellidos">
      {{ joven?.last_name }}
    </el-descriptions-item>
    <el-descriptions-item label="Carnet">
      {{ joven?.carnet }}
    </el-descriptions-item>
    <el-descriptions-item label="Area">
      {{ joven?.area.nombre }}
    </el-descriptions-item>
    <el-descriptions-item label="Direccion">
      {{ joven?.direccion }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>

</style>
