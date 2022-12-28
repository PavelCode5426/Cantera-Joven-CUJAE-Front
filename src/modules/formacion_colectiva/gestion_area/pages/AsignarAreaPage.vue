<script setup lang="ts">
import { ref } from 'vue'

import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import gestionarAreaServices, {PreubicacionFilter} from '~/backed_services/gestionar_area.services'
import {PosibleGraduadoModel} from '~/backed_services/models/posible_graduado.model'

import AuthStore from '~/modules/authentication/store/auth.store'
import type { PaginateResponse } from '~/globals/config/axios'
import { ExceptionResponse } from '~/globals/config/axios'
import PosibleGraduadoFilterForm from "../components/filter/PosibleGraduadoFilterForm.vue";
import PosiblesGraaduadoAreaList from "../components/list/PosiblesGraaduadoAreaList.vue";

const posiblesgraduados = ref<PaginateResponse<PosibleGraduadoModel[]>>([])
const isLoading = ref(true)
const area = AuthStore().user?.area

const filters = ref<PreubicacionFilter>(new PreubicacionFilter(1))

async function loadPosiblesGraduados(filter: PreubicacionFilter) {
  try {
    activateLoading(isLoading)
    posiblesgraduados.value = await gestionarAreaServices.preubicados_area(area_id, filter)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}
async function handleCurrentPageChange(page: number) {
  filters.value.page = page
  await loadPosiblesGraduados(filters.value)
}

loadPosiblesGraduados(filters.value)
</script>

<template>
  <h3>Posibles graduados preubicados en {{ area.nombre }}</h3>

  <posible-graduado-filter-form v-model:filter="filters" @submit="loadPosiblesGraduados(filters)" />

  <posibles-graaduado-area-list :data="posiblesgraduados.results" />

  <paginator :model="posiblesgraduados" @current-change="handleCurrentPageChange" @reload="loadPosiblesGraduados(filters)" />
</template>
