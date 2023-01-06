<script setup lang="ts">
import { defineProps } from 'vue'
import type { ActividadFormacionModel } from '~/backed_services/models/formacion_individual.model'

interface Props {
  actividad: ActividadFormacionModel
}
const props = defineProps<Props>()
</script>

<template>
  <el-descriptions>
    <el-descriptions-item label="Nombre">
      {{ actividad?.nombre }}
    </el-descriptions-item>
    <el-descriptions-item label="Responsable">
      {{ actividad?.responsable }}
    </el-descriptions-item>
    <el-descriptions-item label="Participantes">
      {{ actividad?.participantes }}
    </el-descriptions-item>
    <el-descriptions-item label="Descripcion">
      {{ actividad?.descripcion }}
    </el-descriptions-item>
    <el-descriptions-item label="Observacion">
      {{ actividad?.observacion }}
    </el-descriptions-item>
    <el-descriptions-item label="Fecha de Inicio">
      {{ actividad?.fechaInicio }}
    </el-descriptions-item>
    <el-descriptions-item label="Fecha de Fin">
      {{ actividad?.fechaFin }}
    </el-descriptions-item>
    <el-descriptions-item label="Estado">
      <estado-elemento :estado="actividad?.estado" />
    </el-descriptions-item>
    <el-descriptions-item label="Fecha de Cumplimiento">
      {{ actividad?.fechaCumplimiento }}
    </el-descriptions-item>
  </el-descriptions>
</template>
