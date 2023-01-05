<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import Filter from '../../../../backed_services/service'
import type { ActividadFormacionColectivaModel } from '../../../../backed_services/models/formacion_colectiva.model'
import FColectivaServices from '../../../../backed_services/formacion_colectiva.services'
import type { PosibleGraduadoModel } from '../../../../backed_services/models/posible_graduado.model'

interface Prop {
  posible_graduado: PosibleGraduadoModel
}

const props = defineProps<Prop>()
const showModal = ref(false)
const data = usePaginateResponse<ActividadFormacionColectivaModel>()
const route = useRoute()
const current_user = route.params.id

async function loadData(id: number) {
  try {
    const response: PaginateResponse<ActividadFormacionColectivaModel> = await FColectivaServices.asistencia_joven(id)
    data.value = response
  }

  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Error')
    else ElNotification.error(error.detail)
  }
}
async function evaluacionSuccessHandler(evaluacion) {
  ElNotification.success('Evaluacion creada correctamente')
  showModal.value = false
  props.posible_graduado.evaluacion_fam = evaluacion
}

loadData(current_user.id)
</script>

<template>
  <h3>Actividades Asistidas</h3>

  <preubicaciones-list :data="data.results" />
  <el-row justify="end">
    <el-button @click="showModal = true">
      Evaluar
    </el-button>
  </el-row>
  <el-dialog v-model="showModal">
    <evaluar-posible-graduado-form :posible-graduado="posible_graduado" @success="evaluacionSuccessHandler" />
  </el-dialog>
  <paginator :model="data" @reload="loadData(current_user)" />
</template>
