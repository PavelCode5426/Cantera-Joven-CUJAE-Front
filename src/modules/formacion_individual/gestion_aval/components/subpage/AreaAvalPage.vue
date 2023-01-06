<script setup lang="ts">
import { ref } from 'vue'

import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import jovenService, { JovenFilter } from '~/backed_services/joven.services'

import AuthStore from '~/modules/authentication/store/auth.store'
import type { JovenModel } from '~/backed_services/models/joven.model'
import type { PaginateResponse } from '~/globals/config/axios'
import { ExceptionResponse } from '~/globals/config/axios'

const jovenes = ref<PaginateResponse<JovenModel[]>>([])
const isLoading = ref(true)
const area = AuthStore().user?.area

const filters = ref<JovenFilter>(new JovenFilter())

async function loadJovenes(filter: JovenFilter) {
  try {
    activateLoading(isLoading)
    jovenes.value = await jovenService.all_estudiantes(area.id, filter)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}
async function handleCurrentPageChange(page: number) {
  filters.value.page = page
  await loadJovenes(filters.value)
}

loadJovenes(filters.value)
</script>

<template>
  <h3>Gestion de Avales en {{ area.nombre }}</h3>

  <joven-filter-form v-model:filter="filters" @submit="loadJovenes(filters)" />

  <aval-list :data="jovenes.results" />
  <paginator :model="jovenes" @current-change="handleCurrentPageChange" @reload="loadJovenes(filters)" />
</template>
