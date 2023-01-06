<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import FColectivaServices from '../../../../../backed_services/formacion_colectiva.services'
import { ExceptionResponse } from '../../../../globals/config/axios'
import usePaginateResponse from '../../../../../globals/composables/usePaginateResponse'
import type { PosibleGraduadoModel } from '../../../../../backed_services/models/posible_graduado.model'
import type { PaginateResponse } from '../../../../../globals/config/axios'
import gestionarAreaServices from '../../../../../backed_services/gestionar_area.services'
import type { ActividadFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'
import { ServerError } from '../../../../../globals/config/axios'
import PosiblesGraduadosList from '../lists/PosiblesGraduadosList.vue'
import { Filter } from '../../../../../backed_services/service'
import {
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndRedirect,
  get_current_area_id,
} from '../../../../../helpers/utils'
import UserModel from '../../../../../backed_services/models/user.model'
import AuthStore from '../../../../authentication/store/auth.store'

interface Prop {
  actividad: ActividadFormacionColectivaModel
}

const props = defineProps<Prop>()
const multipleSelection = ref<PosibleGraduadoModel[]>([])
const asistencia = ref([])
const data = usePaginateResponse<PosibleGraduadoModel>()
const filter = ref<Filter>(new Filter())
const route = useRoute()
const current_area = get_current_area_id()

async function loadData(id_area: number, filter: Filter) {
  try {
    const response: PaginateResponse<PosibleGraduadoModel> = await gestionarAreaServices.preubicados_area(id_area, filter)
    data.value = response
  }

  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Error')
    else ElNotification.error(error.detail)
  }
}

async function handleCurrentPageChange(page = 1) {
  filter.value.page = page
  await loadData(current_area, filter.value)
}

function handleSelectionChange(val: PosibleGraduadoModel[]) {
  multipleSelection.value = val
}

async function Asistencia(actividad_id: Number, val: PosibleGraduadoModel[]) {
  try {
    await FColectivaServices.pasar_asistencia_actividad(actividad_id, val)
    ElNotification.success('Asitencia correctamente pasada')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

onMounted(handleCurrentPageChange)
</script>

<template>
  <h3>Asistencia a la actividad</h3>
  <el-row>
    <el-col justify="end">
      <button type="button" class="btn btn-primary uk-text-bold" :disabled="!multipleSelection.length" @click="Asistencia(props.actividad.id, multipleSelection)">
        Asistieron a la actividad
      </button>
    </el-col>
  </el-row>

  <posibles-graduados-list max-height="500" :data="data.results" @selection-change="handleSelectionChange" />
  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_area, filter)" />
</template>
