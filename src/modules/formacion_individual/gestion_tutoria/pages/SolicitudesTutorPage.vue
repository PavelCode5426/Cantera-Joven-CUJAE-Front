<script setup lang="ts">
import { ref } from 'vue'
import type { SolicitudTutorExterno } from '../../../../backed_services/tutoria.services'
import tutoriaServices, { SolicitudTutoriaFilter } from '../../../../backed_services/tutoria.services'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import AuthStore from '../../../authentication/store/auth.store'

const filters = ref<SolicitudTutoriaFilter>(new SolicitudTutoriaFilter(1))
const solicitudes = usePaginateResponse<SolicitudTutorExterno>()
const area = AuthStore().user?.area

async function loadSolicitudes() {
  try {
    solicitudes.value = await tutoriaServices.all_solicitudes(area.id, filters.value)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkIsAuthenticateAndRedirect(error)
    checkServerErrorAndRedirect(error)
  }
}

loadSolicitudes()
</script>

<template>
  <h3>Solicitudes de Tutoria Externa</h3>

  <solicitud-tutor-filter-form :filter="filters" @submit="loadSolicitudes" />

  <solicitudes-tutoria-area-list :data="solicitudes.results" />

  <paginator :model="solicitudes" />
</template>
