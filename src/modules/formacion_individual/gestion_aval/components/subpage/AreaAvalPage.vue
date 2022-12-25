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

const filters = ref<JovenFilter>(new JovenFilter(1))

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
  loadJovenes(filters.value)
}

loadJovenes(filters.value)
</script>

<template>
  <h3>Gestion de Avales en {{ area.nombre }}</h3>

  <el-form inline>
    <el-form-item>
      <el-select v-model="filters.has_aval" placeholder="Filtrar por aval" clearable="true">
        <el-option :value="false" label="Sin aval" />
        <el-option :value="true" label="Con aval" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filters.has_plan" placeholder="Filtrar por plan" clearable="true">
        <el-option :value="false" label="Sin plan" />
        <el-option :value="true" label="Con plan" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filters.has_tutor" placeholder="Filtrar por tutores" clearable="true">
        <el-option>Sin tutor</el-option>
        <el-option>Con tutor</el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="filters.search" placeholder="Buscar estudiante" style="max-width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loadJovenes(filters)">
        Filtrar
      </el-button>
    </el-form-item>
  </el-form>

  <aval-list :data="jovenes.results" />
  <paginator :model="jovenes" @current-change="handleCurrentPageChange" @reload="loadJovenes(filters)" />
</template>
