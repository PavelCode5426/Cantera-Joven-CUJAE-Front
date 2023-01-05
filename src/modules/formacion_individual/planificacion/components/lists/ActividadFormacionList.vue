<script setup lang="ts">
import { computed, defineEmits, defineProps, provide, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { ActividadFormacionModel, EtapaFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import ActividadFormacionForm from '../forms/ActividadFormacionForm.vue'
import formacionIndividualStore from '../../store/planificacion_individual.store'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import { is_joven } from '../../../../../globals/permissions'

interface Props {
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()
const emit = defineEmits(['error', 'success'])
const { plan: planStore } = storeToRefs(formacionIndividualStore())

const actividadesFormacion = ref([])
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

    await loadData(props.etapa.id)
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
function updateActividadProvide(response: ActividadFormacionModel) {
  actividadesFormacion.value = actividadesFormacion.value.map((item) => {
    if (item.id !== response.id)
      return item
    return response
  })
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
  return can_show_estado.value && props.etapa.evaluacion === null && is_joven()
})

loadData(props.etapa.id)
watch(showDialog, async (newValue) => {
  if (newValue === false) {
    selectedActividad.value = undefined
    selectedActividadPadre.value = undefined
    await loadData(props.etapa.id)
  }
})
watch(showDetallesDialog, async (newValue) => {
  if (newValue === false)
    await loadData(props.etapa.id)
})

provide('updateActividad', updateActividadProvide)
</script>

<!-- <el-table v-model:data="actividadesFormacion" max-height="300px" row-key="id" lazy :load="loadSubactividades" > -->
<template>
  <el-table v-model:data="actividadesFormacion" max-height="300px" row-key="id" lazy :load="loadSubactividades" :tree-props="{ children: 'subactividades', hasChildren: 'hasSubactividades' }">
    <el-table-column label="Nombre" prop="nombre" />
    <el-table-column v-if="can_show_estado" label="Estado">
      <template #default="{ row }">
        <estado-elemento :estado="row.estado" />
      </template>
    </el-table-column>
    <el-table-column label="Fecha de Incio" prop="fechaInicio" />
    <el-table-column label="Fecha de Fin" prop="fechaFin" />
    <el-table-column v-if="can_edit_plan">
      <template #header>
        <p-button v-if="can_edit_plan" button-type="success" button-title="Adicionar Actividad" button-icon="fa fa-plus" @click="showCreateUpdateActividadFormacion(undefined)" />
      </template>
      <template #default="{ row }">
        <p-button button-type="info" button-icon="fa fa-edit" @click="showCreateUpdateSubactividadFormacion(row)" />
        <confirm-pop-button
          confirm-button-type="danger"
          button-type="danger"
          button-icon="fa fa-trash-o"
          title="¿Esta seguro que desea eliminar el elemento?"
          @on-confirm="deleteActividadFormacion(row)"
        />
      </template>
    </el-table-column>
    <el-table-column v-else>
      <template #default="{ row }">
        <template v-if="can_manage_subactividad">
          <p-button button-type="success" button-icon="fa fa-plus-circle" @click="showCreateUpdateSubactividadFormacion(undefined, row)" />
          <p-button v-if="row.esSubactividad" button-type="primary" button-icon="fa fa-edit" @click="showCreateUpdateSubactividadFormacion(row)" />
          <confirm-pop-button
            v-if="row.esSubactividad"
            confirm-button-type="danger"
            button-type="danger"
            button-icon="fa fa-trash-o"
            title="¿Esta seguro que desea eliminar el elemento?"
            @on-confirm="deleteActividadFormacion(row)"
          />
        </template>
        <p-button button-type="info" button-icon="fa fa-external-link" @click="showDetailsActividadFormacion(row)" />
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-if="can_edit_plan || can_manage_subactividad" v-model="showDialog" :title="dialogTitle">
    <actividad-formacion-form :actividad="selectedActividad" :actividad-padre="selectedActividadPadre" :etapa="etapa" @cancel="showDialog = false" @success="manageActividadSuccessHandler" />
  </el-dialog>

  <el-dialog v-if="!can_edit_plan || can_manage_subactividad" v-model="showDetallesDialog" title="Detalles de actividad de formacion" style="width: 80%;">
    <actividad-formacion-detail :actividad="selectedActividad" @status-changed="statusChangedSuccessHandler" />
  </el-dialog>
</template>
