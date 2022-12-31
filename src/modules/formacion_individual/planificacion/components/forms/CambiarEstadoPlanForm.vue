<script setup lang="ts">
import { defineProps } from 'vue'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import { is_jefe_area, is_tutor } from '../../../../../globals/permissions'

interface Props {
  estado: EstadoPlanFormacion
}
const props = defineProps<Props>()
</script>

<template>
  <el-select v-model="estado" placeholder="Estado del Plan">
    <el-option :disabled="!is_tutor" :value="EstadoPlanFormacion.desarrollo" label="En desarrollo" />
    <el-option :disabled="!is_tutor" :value="EstadoPlanFormacion.pendiente" label="Pendiente de revision" />
  </el-select>
</template>
