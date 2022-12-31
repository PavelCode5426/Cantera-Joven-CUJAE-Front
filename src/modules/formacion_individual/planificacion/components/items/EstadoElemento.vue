<script setup lang="ts">
import { computed, defineProps } from 'vue'
import {
  EstadoActividadFormacion,
  EstadoPlanFormacion,
} from '../../../../../backed_services/models/formacion_individual.model'

interface Props {
  estado: string
}

const props = defineProps<Props>()
const tagType = computed(() => {
  let type = ''
  const estado = props.estado

  if (estado === EstadoPlanFormacion.desarrollo || estado === EstadoActividadFormacion.desarrollo)
    type = 'info'
  else if (estado === EstadoPlanFormacion.aprobado || estado === EstadoActividadFormacion.cumplida)
    type = 'success'
  else if (estado === EstadoPlanFormacion.rechazado || estado === EstadoActividadFormacion.incumplida)
    type = 'danger'
  else if (estado === EstadoActividadFormacion.parcialmente)
    type = 'warning'

  return type
})
</script>

<template>
  <el-tag :type="tagType">
    {{ estado }}
  </el-tag>
</template>
