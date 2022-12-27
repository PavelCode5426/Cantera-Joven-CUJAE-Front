<script setup lang="ts">
import paginateResponse from '../../../../globals/composables/usePaginateResponse'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import type { JovenModel } from '../../../../backed_services/models/joven.model'
import JovenServices, { JovenFilter } from '~/backed_services/joven.services'
import AuthStore from '~/modules/authentication/store/auth.store'

const area = ref(AuthStore().user?.area)
const filters = ref<JovenFilter>(new JovenFilter(1))
const jovenes = paginateResponse<JovenModel>()

async function loadJovenes(area_id: number, filter: JovenFilter) {
  try {
    jovenes.value = await JovenServices.all_jovenes(area_id, filter)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

async function handleCurrentPageChange(page: number) {
  filters.value.page = page
  await loadJovenes(area.value.id, filters.value)
}

loadJovenes(area.value.id, filters.value)
</script>

<template>
  <h3>Gestion de Tuturia en {{ area.nombre }}</h3>

  <joven-filter-form v-model:filter="filters" @submit="loadJovenes(area.id, filters)" />

  <jovenes-area-list :data="jovenes.results" />

  <paginator :model="jovenes" @current-change="handleCurrentPageChange" />
</template>
