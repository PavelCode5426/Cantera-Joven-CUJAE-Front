<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import formacionIndividualStore from '../../store/planificacion_individual.store'
import CambiarEstadoActividadForm from '../forms/CambiarEstadoActividadForm.vue'
import { is_joven, is_tutor } from '../../../../../globals/permissions'
import ActividadFormacionComentarios from '../items/ActividadFormacionComentarios.vue'
import type { ActividadFormacionModel } from '~/backed_services/models/formacion_individual.model'
import { EstadoPlanFormacion } from '~/backed_services/models/formacion_individual.model'

interface Props {
  actividad: ActividadFormacionModel
}
const props = defineProps<Props>()
const { plan: planStore } = storeToRefs(formacionIndividualStore())
const can_manage_actividad = computed(() => {
  return planStore.value.estado === EstadoPlanFormacion.aprobado
})
const can_manage_execution = computed(() => {
  return is_joven() || is_tutor()
})
</script>

<template>
  <el-tabs>
    <el-tab-pane label="Informacion">
      <actividad-formacion-description border colums="2" :actividad="actividad" />
      <gestor-archivos-actividad-formacion v-if="!can_manage_actividad" :disabled="true" :actividad="actividad" />
    </el-tab-pane>
    <el-tab-pane v-if="can_manage_actividad && can_manage_execution" label="Gestion">
      <el-form label-position="top">
        <cambiar-estado-actividad-form :actividad="actividad" />
        <gestor-archivos-actividad-formacion :actividad="actividad" />
      </el-form>
    </el-tab-pane>
    <el-tab-pane v-if="can_manage_actividad" label="Comentarios">
      <actividad-formacion-comentarios :actividad="props.actividad" />
    </el-tab-pane>
  </el-tabs>
</template>
