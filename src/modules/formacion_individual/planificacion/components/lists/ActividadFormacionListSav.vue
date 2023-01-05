<script setup lang="ts">
import { computed, defineEmits, defineProps, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import type {
  ActividadFormacionModel, EstadoActividadFormacion, EtapaFormacionModel,
} from '../../../../../backed_services/models/formacion_individual.model'

import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import ActividadFormacionForm from '../forms/ActividadFormacionForm.vue'
import formacionIndividualStore from '../../store/planificacion_individual.store'
import { is_joven } from '../../../../../globals/permissions'

interface Props {
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()

const emit = defineEmits(['error', 'success'])

const { plan: planStore } = storeToRefs(formacionIndividualStore())

const actividadesFormacion = ref<ActividadFormacionModel[]>([])
const showDialog = ref(false)
const showDetallesDialog = ref(false)
const selectedActividad = ref<ActividadFormacionModel | undefined>(undefined)
const selectedActividadPadre = ref<ActividadFormacionModel | undefined>(undefined)
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
async function showCreateUpdateSubactividadFormacion(subactividad: ActividadFormacionModel, actividad: ActividadFormacionModel) {
  selectedActividad.value = subactividad
  selectedActividadPadre.value = actividad
  showDialog.value = true
}
async function showDetailsActividadFormacion(actividad: ActividadFormacionModel = undefined) {
  selectedActividad.value = actividad
  showDetallesDialog.value = true
}
async function deleteActividadFormacion(actividad: ActividadFormacionModel, actividadPadre: ActividadFormacionModel = undefined) {
  try {
    await FIndivServices.delete_actividad_formacion(actividad.id)

    // await loadData(props.etapa.id)
    const result = recursiveDelete(actividadesFormacion.value, actividad)
    actividadesFormacion.value = result

    ElNotification.success('Actividad eliminada correctamente')
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error)
  }
}
async function manageActividadSuccessHandler(actividad: ActividadFormacionModel) {
  if (!selectedActividad.value)
    ElNotification.success('Actividad creada correctamente')

  else
    ElNotification.success('Actividad editada correctamente')

  if (selectedActividad.value) {
    selectedActividad.value.nombre = actividad.nombre
  }
  else if (selectedActividadPadre.value) {
    if (!selectedActividadPadre.value.subactividades)
      selectedActividadPadre.value.subactividades = []
    selectedActividadPadre.value.hasSubactividades = true
    selectedActividadPadre.value.subactividades.push(actividad)
  }

  showDialog.value = false
}

/**
 * SUBACTIVIDADES
 */
async function loadSubactividades(row: ActividadFormacionModel, treeNode: unknown, resolve) {
  try {
    const response = await FIndivServices.all_subactividades_from_actividad_formacion(row.id)
    row.subactividades = [...response]
    return resolve(response)
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error.httpCode)
    alert(error)
  }
}

function recursiveDelete(items: ActividadFormacionModel[], actividad: ActividadFormacionModel) {
  const result = items.filter((item) => {
    if (item.hasSubactividades && item.id !== actividad.id && item.subactividades)
      item.subactividades = recursiveDelete(item.subactividades, actividad)
    return item.id !== actividad.id
  })
  return result
}

const can_edit_plan = computed(() => {
  return planStore.value?.estado === EstadoPlanFormacion.desarrollo && props.etapa.evaluacion === null
})
const can_show_estado = computed(() => {
  return planStore.value?.estado === EstadoPlanFormacion.aprobado
})
const can_manage_subactividad = computed(() => {
  return planStore.value?.estado === EstadoPlanFormacion.aprobado && is_joven()
})

loadData(props.etapa.id)
watch(showDialog, async () => {
  if (showDialog.value === false) {
    await loadData(props.etapa.id)
    selectedActividad.value = undefined
    selectedActividadPadre.value = undefined
  }
})
</script>

<template>
  <el-scrollbar max-height="300px">
    <el-table v-model:data="actividadesFormacion" max-height="300px" row-key="id">
      <el-table-column label="Nombre" prop="nombre" />
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
          <template v-if="can_manage_subactividad">
            <el-button @click="showCreateUpdateSubactividadFormacion(undefined, row)">
              +
            </el-button>
            <el-button v-if="row.esSubactividad" type="info" @click="showCreateUpdateSubactividadFormacion(row)">
              <i class="fa fa-edit" />
            </el-button>
            <el-button v-if="row.esSubactividad" type="danger" @click="deleteActividadFormacion(row)">
              <i class="fa fa-trash-o" />
            </el-button>
          </template>
          <el-button type="info" @click="showDetailsActividadFormacion(row)">
            Detalles
          </el-button>
        </template>
      </el-table-column>
      <template #append>
        <el-button v-if="can_edit_plan" style="width: 100%" @click="showCreateUpdateActividadFormacion(undefined)">
          Adicionar Actividad
        </el-button>
      </template>
    </el-table>
  </el-scrollbar>

  <el-dialog v-if="can_edit_plan || can_manage_subactividad" v-model="showDialog" :title="dialogTitle">
    <actividad-formacion-form :actividad="selectedActividad" :actividad-padre="selectedActividadPadre" :etapa="etapa" @cancel="showDialog = false" @success="manageActividadSuccessHandler" />
  </el-dialog>

  <el-dialog v-if="!can_edit_plan || can_manage_subactividad" v-model="showDetallesDialog" title="Detalles de actividad de formacion" style="width: 80%;">
    <actividad-formacion-detail :actividad="selectedActividad" />
  </el-dialog>
</template>
