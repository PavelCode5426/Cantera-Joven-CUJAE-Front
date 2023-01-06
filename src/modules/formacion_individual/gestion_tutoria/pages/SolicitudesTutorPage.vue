<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SolicitudTutorExterno } from '../../../../backed_services/tutoria.services'
import tutoriaServices, { SolicitudTutoriaFilter } from '../../../../backed_services/tutoria.services'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import AuthStore from '../../../authentication/store/auth.store'

const filters = ref<SolicitudTutoriaFilter>(new SolicitudTutoriaFilter(1))
const solicitudes = usePaginateResponse<SolicitudTutorExterno>()
const area = AuthStore().user?.area

async function loadSolicitudes(area_id, filters) {
  try {
    const response = await tutoriaServices.all_solicitudes(area_id, filters)
    solicitudes.value = response
  }
  catch (error: ServerError | ExceptionResponse) {
    checkIsAuthenticateAndRedirect(error)
    checkServerErrorAndRedirect(error)
  }
}

async function handleCurrentPageChange(page = 1) {
  filters.value.page = page
  await loadSolicitudes(area.id, filters.value)
}

onMounted(handleCurrentPageChange)
</script>

<template>
  <h3>Solicitudes de Tutoria Externa</h3>

  <solicitud-tutor-filter-form :filter="filters" @submit="handleCurrentPageChange" />

  <solicitudes-tutoria-area-list :data="solicitudes.results" />

  <paginator :model="solicitudes" @current-change="handleCurrentPageChange" @reload="handleCurrentPageChange" />
</template>
