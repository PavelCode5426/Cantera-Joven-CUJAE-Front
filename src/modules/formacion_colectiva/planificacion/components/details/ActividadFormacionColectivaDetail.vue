<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import formacionColectivaStore from '../../store/planificacion_colectiva.store'
import CambiarEstadoActividadForm from '../forms/CambiarEstadoActividadForm.vue'
import { is_jefe_area, is_director_recursos_humanos, is_vicerrector } from '../../../../../globals/permissions'
import {ActividadFormacionColectivaModel} from '../../../../../backed_services/models/formacion_colectiva.model'
import {EstadoPlanFormacionColectiva} from '../../../../../backed_services/models/formacion_colectiva.model'
import ActividadFormacionComentarios from '../items/ActividadFormacionComentarios.vue'


interface Props {
  actividad: ActividadFormacionColectivaModel
}
const props = defineProps<Props>()
const { plan: planStore } = storeToRefs(formacionColectivaStore())
const can_manage_actividad = computed(() => {
  return planStore.value.estado === EstadoPlanFormacionColectiva.aprobado
})
const can_manage_assistance = computed(() => {
  return is_jefe_area()
})
</script>

<template>
  <el-tabs>
    <el-tab-pane label="Información">
      <actividad-formacion-colectiva-description border colums="2" :actividad="actividad" />
      <gestor-archivos-formacion v-if="!can_manage_actividad" :disabled="true" :actividad="actividad" />
    </el-tab-pane>
    <el-tab-pane v-if="can_manage_assistance" label="Asistencia">
      <posibles-graduados-asistencia-list :actividad="props.actividad" />
    </el-tab-pane>
  </el-tabs>
</template>
