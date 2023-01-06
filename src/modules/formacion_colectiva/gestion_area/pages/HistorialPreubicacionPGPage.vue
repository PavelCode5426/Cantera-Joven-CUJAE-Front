<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutorAsignadoModel } from '../../../../backed_services/models/tutorial.model'
import { Filter } from '../../../../backed_services/service'
import type UserModel from '../../../../backed_services/models/user.model'
import {PosibleGraduadoModel} from "../../../../backed_services/models/posible_graduado.model";
import gestionarAreaServices, {PreubicacionFilter} from "../../../../backed_services/gestionar_area.services";

const data = usePaginateResponse<PosibleGraduadoModel>()
const filters = ref<PreubicacionFilter>(new PreubicacionFilter())
const route = useRoute()

async function loadData(filter: PreubicacionFilter) {
  try {
    const response: PaginateResponse<UserModel> = await gestionarAreaServices.get_pgraduados(filter)
    data.value = response
  }
  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Ha seleccionado un posible graduado uncorrecto')
    else ElNotification.error(error.detail)
  }
}

async function handleCurrentPageChange(page = 1) {
  filters.value.page = page
  await loadData(filters.value)
}

handleCurrentPageChange(1)
</script>

<template>
  <h3>Historial de preubicación de posibles graduados</h3>
  <filter-form v-model:filter="filters" @submit="loadData(filters)" />

  <users-list :data="data.results">
    <template #default>
      <el-table-column>
        <template #default="scope">
          <router-link :to="{ name: 'historial-preubicacion-posible-graduado-page', params: { id: scope.row.id } }">
            <el-button>
              Historial
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </template>
  </users-list>

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(filters)" />
</template>
