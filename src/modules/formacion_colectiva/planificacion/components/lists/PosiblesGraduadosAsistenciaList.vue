<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import AuthStore from '../../../authentication/store/auth.store'
import ImportService from '../../../../backed_services/importar.services'
import FColectivaServices from '../../../../../backed_services/formacion_colectiva.services'
import { ExceptionResponse } from '../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import { Filter } from '../../../../backed_services/service'
import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import usePaginateResponse from "../../../../../globals/composables/usePaginateResponse";
import {PosibleGraduadoModel} from "../../../../../backed_services/models/posible_graduado.model";
import {useRoute} from "vue-router";
import {PaginateResponse} from "../../../../../globals/config/axios";
import gestionarAreaServices from "../../../../../backed_services/gestionar_area.services";
import {ActividadFormacionColectivaModel} from "../../../../../backed_services/models/formacion_colectiva.model";

const data = usePaginateResponse<PosibleGraduadoModel>()
const filter = ref<Filter>(new Filter())
const multipleSelection = ref<PosibleGraduadoModel[]>([])
const route = useRoute()
const current_area = route.params.id

async function loadPGraduados(id: number, filter: Filter) {
  try {
    const response: PaginateResponse<PosibleGraduadoModel> = await gestionarAreaServices.preubicados_area(id, filter)
    data.value = response
  }

  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Error')
    else ElNotification.error(error.detail)
  }
}

function handleSelectionChange(val: PosibleGraduadoModel[]) {
  multipleSelection.value = val
}

async function handleCurrentPageChange(page = 1) {
  filter.value.page = page
  await loadPGraduados(current_area, filter.value)
}

async function pasar_asistencia(elements) { //ARREGLAR ESTO
  try {
    await FColectivaServices.pasar_asistencia_actividad(elements)
    multipleSelection.value = []
    ElNotification.success('')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}
handleCurrentPageChange(1)
onMounted(loadPGraduados)
</script>

<template>
  <h3>Asistencia a la actividad</h3>
  <el-row justify="space-between">
    <el-col :span="7">
      <button type="button" class="btn btn-primary uk-text-bold" :disabled="!multipleSelection.length" @click="pasar_asistencia(multipleSelection)">
        Asistieron a la actividad
      </button>
    </el-col>
  </el-row>

  <users-list max-height="500" :data="data.result" @selection-change="handleSelectionChange" />
</template>