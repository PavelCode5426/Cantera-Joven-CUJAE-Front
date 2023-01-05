<script setup lang="ts">
import { computed, defineEmits, defineProps, inject, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { EstadoActividadFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import type { ActividadFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import { is_joven } from '../../../../../globals/permissions'
import { ExceptionResponse, ServerResponse } from '../../../../../globals/config/axios'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'

interface Props {
  actividad: ActividadFormacionModel
}
const props = defineProps<Props>()
const emit = defineEmits(['statusChanged'])
const estado = ref(props.actividad?.estado)
// const updateActividad = inject('updateActividad')

async function solicitarRevisionSubmit() {
  try {
    const response = await FIndivServices.request_review_actividad_formacion(props.actividad.id)
    estado.value = EstadoActividadFormacion.pendiente
    // updateActividad(props.actividad.estado)
    ElNotification.success('Revision solicitada correctamente')
  }
  catch (error: ExceptionResponse | ServerResponse) {
    ElNotification.error(error.detail)
  }
}
async function changeNivelCumplimientoHandler() {
  try {
    const response = await FIndivServices.change_status_actividad_formacion(props.actividad.id, estado.value)
    emit('statusChanged', response)
    // updateActividad(response)
    ElNotification.success('Estado cambiado correctamente')
  }
  catch (error: ExceptionResponse | ServerResponse) {
    ElNotification.error(error.detail)
  }
}

watch(props, (newVal) => {
  estado.value = newVal.actividad?.estado
})
const can_request_review = computed(() => {
  return estado.value === EstadoActividadFormacion.pendiente || estado.value === EstadoActividadFormacion.cumplida
})
</script>

<template>
  <el-form-item v-if="!is_joven">
    <el-button :disabled="can_request_review" @click="solicitarRevisionSubmit">
      Solicitar Revision
    </el-button>
  </el-form-item>

  <el-form-item v-else label="Seleccione el nivel de cumplimiento">
    <el-select v-model="estado" placeholder="Seleccionar Nivel de Cumplimiento" @change="changeNivelCumplimientoHandler">
      <el-option :value="EstadoActividadFormacion.revisada" label="Revisada" />
      <el-option :value="EstadoActividadFormacion.parcialmente" label="Parcialmente cumplida" />
      <el-option :value="EstadoActividadFormacion.incumplida" label="Incumplida" />
      <el-option :value="EstadoActividadFormacion.cumplida" label="Cumplida" />
    </el-select>
  </el-form-item>
</template>
