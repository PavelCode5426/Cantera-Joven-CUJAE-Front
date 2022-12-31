<script setup lang="ts">
import { defineProps } from 'vue'
import type { PlanFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'

interface Prop {
  plan: PlanFormacionModel
}

const props = defineProps<Prop>()
</script>

<template>
  <el-descriptions>
    <el-descriptions-item label="Nombre y Apellidos">
      {{ props.plan?.joven?.first_name }} {{ props.plan?.joven?.last_name }}
    </el-descriptions-item>
    <el-descriptions-item label="Carnet">
      {{ props.plan?.joven?.carnet }}
    </el-descriptions-item>
    <el-descriptions-item label="Direccion">
      {{ props.plan?.joven?.direccion }}
    </el-descriptions-item>
    <el-descriptions-item label="Area">
      {{ props.plan?.joven?.area?.nombre }}
    </el-descriptions-item>
    <el-descriptions-item label="Fecha de Creacion">
      {{ props.plan?.fechaCreado }}
    </el-descriptions-item>
    <el-descriptions-item label="Estado">
      <estado-elemento :estado="props.plan?.estado" />
    </el-descriptions-item>
    <el-descriptions-item v-if="props.plan?.aprobadoPor" label="Aprobado por:">
      {{ props.plan?.aprobadoPor.first_name }} {{ props.plan?.aprobadoPor.last_name }}
    </el-descriptions-item>
  </el-descriptions>
</template>
