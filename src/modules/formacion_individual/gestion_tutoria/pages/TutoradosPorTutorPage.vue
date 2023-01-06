<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import type { JovenModel } from '../../../../backed_services/models/joven.model'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import tutoriaServices, { TutoriaFilter } from '../../../../backed_services/tutoria.services'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutoradoAsignadoModel } from '../../../../backed_services/models/tutorial.model'

const data = usePaginateResponse<TutoradoAsignadoModel>()
const filters = ref<TutoriaFilter>(new TutoriaFilter())
const route = useRoute()
const current_user = route.params.id

async function loadData(id: number, filter: TutoriaFilter) {
  try {
    const response: PaginateResponse<TutoradoAsignadoModel> = await tutoriaServices.all_tutorados_from_tutor(id, filter)
    data.value = response
  }
  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Ha seleccionado un tutor incorrecto')
    else ElNotification.error(error.detail)
  }
}

async function handleCurrentPageChange(page = 1) {
  filters.value.page = page
  await loadData(current_user, filters.value)
}

handleCurrentPageChange(1)
</script>

<template>
  <h3>Tutorados Asignados</h3>
  <tutoria-filter-form v-model:filter="filters" @submit="loadData(current_user, filters)" />

  <tutorados-list :data="data.results" />

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_user, filters)" />
</template>
