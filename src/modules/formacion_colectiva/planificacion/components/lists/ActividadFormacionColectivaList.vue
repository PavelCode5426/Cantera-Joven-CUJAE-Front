<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FColectivaServices from '../../../../../backed_services/formacion_colectiva.services'
import formacionColectivaStore from '../../store/planificacion_colectiva.store'
import type { ActividadFormacionColectivaModel, EtapaFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'
import { EstadoPlanFormacionColectiva } from '../../../../../backed_services/models/formacion_colectiva.model'
import type { ActividadFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import { is_jefe_area } from '../../../../../globals/permissions'

interface Props {
  etapa: EtapaFormacionColectivaModel
}

const props = defineProps<Props>()
const emit = defineEmits(['error', 'success'])
const { plan: planStore } = storeToRefs(formacionColectivaStore())

const actividadesFormacion = ref([])
const showDialog = ref(false)
const showDetallesDialog = ref(false)
const selectedActividad = ref<ActividadFormacionColectivaModel | undefined>(undefined)
const selectedActividadGeneral = ref<ActividadFormacionColectivaModel | undefined>(undefined)
const dialogTitle = computed(() => {
  if (selectedActividad.value)
    return 'Editar actividad de formacion colectiva'
  else return 'Adicionar actividad de formacion colectiva'
})

async function loadData(etapa_id: number) {
  try {
    const actividades = await FColectivaServices.all_actividades_generales_from_etapa(etapa_id)
    actividadesFormacion.value = actividades
  }
  catch (error: ServerError | ExceptionResponse) {
    alert(error)
    ElNotification.error(error.httpCode)
  }
}
async function showCreateUpdateActividadFormacion(actividad: ActividadFormacionColectivaModel = undefined) {
  selectedActividad.value = actividad
  showDialog.value = true
}
async function showCreateUpdateActividadEspecifica(act_especifica: ActividadFormacionColectivaModel, actividad: ActividadFormacionColectivaModel) {
  selectedActividad.value = act_especifica
  selectedActividadGeneral.value = actividad
  showDialog.value = true
}
async function showDetailsActividadFormacion(actividad: ActividadFormacionColectivaModel = undefined) {
  selectedActividad.value = actividad
  showDetallesDialog.value = true
}

async function deleteActividadFormacion(actividad: ActividadFormacionColectivaModel, act_general: ActividadFormacionColectivaModel = undefined) {
  try {
    await FColectivaServices.delete_actividad_general(actividad.id)

    await loadData(props.etapa.id)
    const result = recursiveDelete(actividadesFormacion.value, actividad)
    actividadesFormacion.value = result

    ElNotification.success('Actividad eliminada correctamente')
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error)
  }
}

async function manageActividadSuccessHandler(actividad: ActividadFormacionColectivaModel) {
  if (!selectedActividad.value)
    ElNotification.success('Actividad creada correctamente')
  else
    ElNotification.success('Actividad editada correctamente')

  if (selectedActividad.value) {
    selectedActividad.value.nombre = actividad.nombre
  }
  else if (selectedActividadGeneral.value) {
    if (!selectedActividadGeneral.value.actividades_especificas)
      selectedActividadGeneral.value.actividades_especificas = []
    selectedActividadGeneral.value.esEspecifica = true
    selectedActividadGeneral.value.actividades_especificas.push(actividad)
  }

  showDialog.value = false
}
/*Acts EspecificasS*/
async function loadActividadesEspecificas(row: ActividadFormacionColectivaModel, treeNode: unknown, resolve) {
  try {
    const response = await FColectivaServices.all_actividades_especificas(row.id)
    row.actividades_especificas = [...response]
    return resolve(response)
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error.httpCode)
    alert(error)
  }
}

function recursiveDelete(items: ActividadFormacionColectivaModel[], actividad: ActividadFormacionColectivaModel) {
  const result = items.filter((item) => {
    if (item.esEspecifica && item.id !== actividad.id && item.actividades_especificas)
      item.actividades_especificas = recursiveDelete(item.actividades_especificas, actividad)
    return item.id !== actividad.id
  })
  return result
}

const can_edit_plan = computed(() => {
  return planStore.value?.estado === EstadoPlanFormacionColectiva.desarrollo
})
const can_show_estado = computed(() => {
  return planStore.value?.estado === EstadoPlanFormacionColectiva.aprobado
})
const can_manage_act_especifica = computed(() => {
  return can_show_estado.value && is_jefe_area()
})

loadData(props.etapa.id)
watch(showDialog, async (newValue) => {
  if (newValue === false) {
    selectedActividad.value = undefined
    selectedActividadGeneral.value = undefined
    await loadData(props.etapa.id)
  }
})
</script>

<template>
  <el-table v-model:data="actividadesFormacion" max-height="300px" row-key="id" lazy :load="loadActividadesEspecificas">
    <el-table-column label="Nombre" prop="nombre" />
    <el-table-column label="Fecha de Incio" prop="fechaInicio" />
    <el-table-column label="Fecha de Fin" prop="fechaFin" />
    <el-table-column v-if="can_edit_plan">
      <template #header>
        <p-button v-if="can_edit_plan" button-type="success" button-title="Adicionar Actividad" button-icon="fa fa-plus" @click="showCreateUpdateActividadFormacion(undefined)" />
      </template>
      <template #default="{ row }">
        <p-button button-type="info" button-icon="fa fa-edit" @click="showCreateUpdateActividadEspecifica(row)" />
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
        <template v-if="can_manage_act_especifica">
          <p-button button-type="success" button-icon="fa fa-plus-circle" @click="showCreateUpdateActividadEspecifica(undefined, row)" />
          <p-button v-if="row.esEspecifica" button-type="primary" button-icon="fa fa-edit" @click="showCreateUpdateActividadEspecifica(row)" />
          <confirm-pop-button
              v-if="row.esEspecifica"
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

  <el-dialog v-if="can_edit_plan || can_manage_act_especifica" v-model="showDialog" :title="dialogTitle">
    <actividad-formacion-colectiva-form :actividad="selectedActividad" :actividad-general="selectedActividadGeneral" :etapa="etapa" @cancel="showDialog = false" @success="manageActividadSuccessHandler" />
  </el-dialog>

  <el-dialog v-if="!can_edit_plan || can_manage_act_especifica" v-model="showDetallesDialog" title="Detalles de actividad de formacion" style="width: 80%;">
    <actividad-formacion-colectiva-detail :actividad="selectedActividad" />
  </el-dialog>
</template>
