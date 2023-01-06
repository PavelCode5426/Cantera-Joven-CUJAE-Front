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

const data = usePaginateResponse<ActividadFormacionColectivaModel>()
const filter = ref<Filter>(new Filter())
const route = useRoute()
const current_user = route.params.id

async function loadData(id: number, filter: Filter) {
  try {
    const response: PaginateResponse<ActividadFormacionColectivaModel> = await FColectivaServices.asistencia_joven(id, filter)
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
  await loadData(current_user)
}

handleCurrentPageChange(1)
</script>

<template>
  <h3>Actividades Asistidas</h3>

  <preubicaciones-list :data="data.results" />

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_user, filter)" />
</template>
