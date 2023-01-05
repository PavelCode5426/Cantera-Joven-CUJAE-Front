<script setup lang="ts">
import { defineProps } from 'vue'
import type { PlanFormacionFilter } from '../../../../../backed_services/formacion_individual.services'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'

interface Props {
  filter: PlanFormacionFilter
}
const props = defineProps<Props>()
</script>

<template>
  <filter-form v-model:filter="filter">
    <el-form-item>
      <el-select v-model="filter.estado" placeholder="Filtrar por estado" clearable="true">
        <el-option :value="EstadoPlanFormacion.desarrollo" :label="EstadoPlanFormacion.desarrollo" />
        <el-option :value="EstadoPlanFormacion.pendiente" :label="EstadoPlanFormacion.pendiente" />
        <el-option :value="EstadoPlanFormacion.rechazado" :label="EstadoPlanFormacion.rechazado" />
        <el-option :value="EstadoPlanFormacion.aprobado" :label="EstadoPlanFormacion.aprobado" />
        <el-option :value="EstadoPlanFormacion.finalizado" :label="EstadoPlanFormacion.finalizado" />
      </el-select>
    </el-form-item>
  </filter-form>
</template>
