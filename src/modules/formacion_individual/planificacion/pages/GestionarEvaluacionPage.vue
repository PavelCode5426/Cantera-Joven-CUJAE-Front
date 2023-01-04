<script lang="ts" setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import EvaluacionFilterForm from '../components/filters/EvaluacionFilterForm.vue'
import FIndivServices, { EvaluacionFilter } from '../../../../backed_services/formacion_individual.services'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { EvaluacionFinalModel, EvaluacionFormacionModel } from '../../../../backed_services/models/formacion_individual.model'
import AuthStore from '../../../authentication/store/auth.store'

const filter = ref(new EvaluacionFilter())
const evaluaciones = usePaginateResponse<EvaluacionFinalModel | EvaluacionFormacionModel>()
const showDialog = ref(false)
const selectedEvaluacion = ref<EvaluacionFinalModel | EvaluacionFormacionModel>(undefined)
const current_user = AuthStore().user

async function loadData(filter) {
  try {
    const response = await FIndivServices.list_evaluaciones(filter)
    evaluaciones.value = response
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error)
    alert(error.httpCode)
  }
}
async function currentPageChangeHanlder(page) {
  filter.value.page = page
  await loadData(filter.value)
}
function showEvaluacionDetail(evaluacion: EvaluacionFormacionModel | EvaluacionFinalModel) {
  selectedEvaluacion.value = evaluacion
  showDialog.value = true
}
async function aprobarEvaluacionSuccessHandler() {
  ElNotification.success('Evaluacion aprobada correctamente')
  showDialog.value = false
  selectedEvaluacion.value.aprobadoPor = current_user
  filter.value.reset()
  loadData(filter.value)
}

loadData(filter.value)
</script>

<template>
  <h3>Evaluaciones de la Formacion Individual</h3>
  <evaluacion-filter-form v-model:filter="filter" @submit="loadData(filter)" />
  <evaluacion-list :data="evaluaciones.results">
    <el-table-column v-slot="{ row }">
      <el-button @click="showEvaluacionDetail(row)">
        Revisar
      </el-button>
    </el-table-column>
  </evaluacion-list>
  <paginator :model="evaluaciones" @current-change="currentPageChangeHanlder" />

  <el-dialog v-model="showDialog" title="Detalle de Evaluacion">
    <evaluacion-detail :evaluacion="selectedEvaluacion" :show-details="true" />
    <aprobar-evaluacion-form
      v-if="!selectedEvaluacion.aprobadoPor"
      :evaluacion="selectedEvaluacion"
      @success="aprobarEvaluacionSuccessHandler"
      @cancel="showDialog = false"
    />
  </el-dialog>
</template>
