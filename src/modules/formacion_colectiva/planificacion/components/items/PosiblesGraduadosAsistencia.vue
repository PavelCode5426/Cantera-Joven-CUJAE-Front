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
import { Filter } from "../../../../../backed_services/service";
import {checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect} from "../../../../../helpers/utils";

interface Prop {
  actividad: ActividadFormacionColectivaModel
}

const props = defineProps<Prop>()
const data = usePaginateResponse<PosibleGraduadoModel>()
const filter = ref<Filter>(new Filter())
const multipleSelection = ref<PosibleGraduadoModel[]>([])
const route = useRoute()
const current_area = route.params.id
const asistencia = ref([])


async function loadPGraduados(area_id, filter: Filter) {
  try {
    const multipleSelection: PaginateResponse<PosibleGraduadoModel> = await gestionarAreaServices.preubicados_area(area_id, filter)
    data.value = multipleSelection
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

async function Asistencia(actividad_id: Number) {
  try {
    await FColectivaServices.pasar_asistencia_actividad(actividad_id)
    multipleSelection.value = []
    ElNotification.success('Posibles graduados importados correctamente')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

handleCurrentPageChange(1)
</script>

<template>
  <h3>Asistencia a la actividad</h3>
  <el-row>
    <el-col justify="end">
      <button type="button" class="btn btn-primary uk-text-bold" :disabled="!multipleSelection.length" @click="Asistencia(multipleSelection)">
        Asistieron a la actividad
      </button>
    </el-col>
  </el-row>

  <posibles-graduados-list max-height="500" :data="data.result" @selection-change="handleSelectionChange" />
</template>
