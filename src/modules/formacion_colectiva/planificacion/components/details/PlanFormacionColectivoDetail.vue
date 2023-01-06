<script setup lang="ts">
import { defineProps } from 'vue'
import type { PlanFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'

interface Prop {
  plan: PlanFormacionColectivaModel
}

const props = defineProps<Prop>()
</script>

<template>
  <el-descriptions>
    <el-descriptions-item label="Fecha de Creación">
      {{ props.plan?.fechaCreado }}
    </el-descriptions-item>
    <el-descriptions-item label="Estado">
      <estado-elemento :estado="props.plan?.estado" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.plan?.aprobadoPor" label="Aprobado por:">
      {{ props.plan?.aprobadoPor.first_name  }} {{ props.plan?.aprobadoPor.last_name }}
    </el-descriptions-item>
  </el-descriptions>
</template>
