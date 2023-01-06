<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { get_current_area_id, get_current_id } from '../../../../helpers/utils'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PlanFormacionModel } from '../../../../backed_services/models/formacion_individual.model'
import { Filter } from '../../../../backed_services/service'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import FIndivServices from '../../../../backed_services/formacion_individual.services'

const route = useRoute()
const tutor_id = route.params.id
const planesFormacion = usePaginateResponse<PlanFormacionModel>()
const filter = ref(new Filter()) // TODO TERMNIAR ESTO
async function loadData(filter: Filter) {
  try {
    const response = await FIndivServices.list_planes_formacion_from_tutor(tutor_id, filter)
    planesFormacion.value = response
  }
  catch (error: ServerError | ExceptionResponse) {
    alert(error)
  }
}
async function filterFormHandler() {
  filter.value.page = 1
  await loadData(filter.value)
}
async function changePageHandler(page) {
  filter.value.page = page
  await loadData(filter.value)
}

loadData(filter.value)
// TODO PONER FILTRADOS EN LOS PLANES DEL AREA
</script>

<template>
  <h3>Planes de Formacion Individual</h3>

  <plan-formacion-filter-form v-model:filter="filter" @submit="filterFormHandler" />
  <plan-formacion-list :data="planesFormacion.results">
    <el-table-column prop="fechaCreado" label="Fecha Creado" />
    <el-table-column label="Estado">
      <template #default="{ row }">
        <estado-elemento :estado="row?.estado" />
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="{ row }">
        <router-link :to="{ name: 'plan-formacion-page', params: { id: row?.id } }">
          <el-button>
            Detalles
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </plan-formacion-list>
  <paginator :model="planesFormacion" @current-change="changePageHandler" @reload="loadData(filter)" />
</template>
