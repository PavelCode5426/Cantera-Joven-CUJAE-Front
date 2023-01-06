<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type AreaModel from '../../../../../backed_services/models/area.model'
import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import jovenService, { JovenFilter } from '~/backed_services/joven.services'

import AuthStore from '~/modules/authentication/store/auth.store'
import type { JovenModel } from '~/backed_services/models/joven.model'
import type { PaginateResponse } from '~/globals/config/axios'
import { ExceptionResponse } from '~/globals/config/axios'

const jovenes = ref<PaginateResponse<JovenModel[]>>([])
const isLoading = ref(true)
const areaSelected = ref<AreaModel>({ ...AuthStore().user?.area })

const filters = ref<JovenFilter>(new JovenFilter())

async function loadJovenes(area_id: number, filter: JovenFilter) {
  try {
    activateLoading(isLoading)
    jovenes.value = await jovenService.all_jovenes(area_id, filter)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}
async function handleCurrentPageChange(page = 1) {
  filters.value.page = page
  await loadJovenes(areaSelected.value.id, filters.value)
}

onMounted(handleCurrentPageChange)
</script>

<template>
  <h3>Gestion de Avales en la Universidad</h3>

  <joven-area-filter-form v-model:area="areaSelected" v-model:filter="filters" @submit="handleCurrentPageChange" />

  <aval-list :data="jovenes.results" @reload="handleCurrentPageChange" />
  <paginator :model="jovenes" @current-change="handleCurrentPageChange" />
</template>
