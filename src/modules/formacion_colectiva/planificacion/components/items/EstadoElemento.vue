<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { EstadoPlanFormacionColectiva } from '../../../../../backed_services/models/formacion_colectiva.model'

interface Props {
  estado: string
}

const props = defineProps<Props>()
const tagType = computed(() => {
  let type = ''
  const estado = props.estado

  if (estado === EstadoPlanFormacionColectiva.desarrollo)
    type = 'info'
  else if (estado === EstadoPlanFormacionColectiva.aprobado)
    type = 'success'
  else if (estado === EstadoPlanFormacionColectiva.rechazado)
    type = 'danger'

  return type
})
</script>

<template>
  <el-tag :type="tagType">
    {{ estado }}
  </el-tag>
</template>
