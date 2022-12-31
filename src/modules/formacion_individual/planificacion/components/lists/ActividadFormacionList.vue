<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { ActividadFormacionModel, EtapaFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import ActividadFormacionForm from '../forms/ActividadFormacionForm.vue'
import formacionIndividualStore from '../../store/planificacion_individual.store'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'

interface Props {
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()
const emit = defineEmits(['error', 'success'])
const { plan: planStore } = storeToRefs(formacionIndividualStore())

const actividadesFormacion = ref([])
const showDialog = ref(false)
const selectedActividad = ref<ActividadFormacionModel | undefined>(undefined)
const dialogTitle = computed(() => {
  if (selectedActividad.value)
    return 'Editar actividad de formacion'
  else return 'Adicionar actividad de formacion'
})

async function loadData(etapa_id: number) {
  try {
    const actividades = await FIndivServices.all_actividades_formacion_from_etapa(etapa_id)
    actividadesFormacion.value = actividades
  }
  catch (error: ServerError | ExceptionResponse) {
    alert(error)
    ElNotification.error(error.httpCode)
  }
}
async function showCreateUpdateActividadFormacion(actividad: ActividadFormacionModel = undefined) {
  selectedActividad.value = actividad
  showDialog.value = true
}
async function deleteActividadFormacion(actividad: ActividadFormacionModel) {
  try {
    await FIndivServices.delete_actividad_formacion(actividad.id)
    await loadData(props.etapa.id)
    ElNotification.success('Actividad eliminada correctamente')
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error)
  }
}
async function manageActividadSuccessHandler(actividad: ActividadFormacionModel) {
  if (selectedActividad.value)
    ElNotification.success('Actividad creada correctamente')

  else
    ElNotification.success('Actividad editada correctamente')

  showDialog.value = false
}

const can_edit_plan = computed(() => {
  return planStore.value.estado === EstadoPlanFormacion.desarrollo && props.etapa.evaluacion === null
})
const can_show_estado = computed(() => {
  return planStore.value?.estado === EstadoPlanFormacion.aprobado
})

loadData(props.etapa.id)
watch(showDialog, async () => {
  if (showDialog.value === false)
    await loadData(props.etapa.id)
})
</script>

<template>
  <el-table :data="actividadesFormacion">
    <el-table-column label="Nombre" prop="nombre" />
    <el-table-column label="Responsable" prop="responsable" />
    <el-table-column label="Participantes" prop="participantes" />
    <el-table-column v-if="can_show_estado" label="Estado">
      <template #default="{ row }">
        <estado-elemento :estado="row.estado" />
      </template>
    </el-table-column>
    <el-table-column label="Fecha de Incio" prop="fechaInicio" />
    <el-table-column label="Fecha de Fin" prop="fechaFin" />
    <el-table-column v-if="can_edit_plan">
      <template #default="{ row }">
        <el-button type="info" @click="showCreateUpdateActividadFormacion(row)">
          <i class="fa fa-edit" />
        </el-button>
        <el-button type="danger" @click="deleteActividadFormacion(row)">
          <i class="fa fa-trash-o" />
        </el-button>
      </template>
    </el-table-column>
    <el-table-column v-else>
      <template #default="{ row }">
        <el-button type="info" @click="showCreateUpdateActividadFormacion(row)">
          Detalles
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-button v-if="can_edit_plan" style="width: 100%" @click="showCreateUpdateActividadFormacion(undefined)">
    Adicionar Actividad
  </el-button>
  <el-dialog v-if="can_edit_plan" v-model="showDialog" :title="dialogTitle">
    <actividad-formacion-form :actividad="selectedActividad" :etapa="etapa" @cancel="showDialog = false" @success="manageActividadSuccessHandler" />
  </el-dialog>
  <el-dialog v-else v-model="showDialog" title="Detalles de actividad de formacion" style="width: 80%;">
    <actividad-formacion-detail :actividad="selectedActividad" />
  </el-dialog>
</template>
