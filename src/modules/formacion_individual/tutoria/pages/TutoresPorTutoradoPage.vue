<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import type { JovenModel } from '../../../../backed_services/models/joven.model'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import tutoriaServices, { TutoriaFilter } from '../../../../backed_services/tutoria.services'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutorAsignadoModel } from '../../../../backed_services/models/tutorial.model'

const data = usePaginateResponse<TutorAsignadoModel>()
const filters = ref<TutoriaFilter>(new TutoriaFilter())
const route = useRoute()
const current_user = route.params.id

async function loadData(id: number, filter: TutoriaFilter) {
  try {
    const response: PaginateResponse<TutoradoAsignadoModel> = await tutoriaServices.all_tutores_from_joven(id, filter)
    data.value = response
  }
  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Ha seleccionado un tutorado incorrecto')
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
  <h3>Tutores Asignados</h3>
  <tutoria-filter-form v-model:filter="filters" @submit="loadData(current_user, filters)" />

  <tutores-list :data="data.results" />

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_user, filters)" />
</template>
