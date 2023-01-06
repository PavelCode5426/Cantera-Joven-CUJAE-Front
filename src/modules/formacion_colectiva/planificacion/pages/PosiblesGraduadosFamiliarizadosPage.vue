<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import { Filter } from '../../../../backed_services/service'
import type UserModel from '../../../../backed_services/models/user.model'
import type { PosibleGraduadoModel } from '../../../../backed_services/models/posible_graduado.model'
import gestionarAreaServices from '../../../../backed_services/gestionar_area.services'

const data = usePaginateResponse<PosibleGraduadoModel>()
const filter = ref<Filter>(new Filter())
const route = useRoute()
const current_area = route.params.id

async function loadData(id_area: number, filter: Filter) {
  try {
    const response: PaginateResponse<UserModel> = await gestionarAreaServices.preubicados_area(id_area, filter)
    data.value = response
  }

  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Error')
    else ElNotification.error(error.detail)
  }
}

async function handleCurrentPageChange(page = 1) {
  filter.value.page = page
  await loadData(current_area, filter.value)
}

handleCurrentPageChange(1)
</script>

<template>
  <h3>Posibles Graduados en el Área</h3>
  <filter-form v-model:filter="filter" @submit="loadData(current_area, filter)"/>
  <users-list :data="data.results">
    <el-table-column>
      <template #default="{ row }">
        <router-link :to="{ name: 'asistencia-posibles-graduados-familiarizados-page', params: { id: row?.id } }">
          <el-button>
            Asistencias
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </users-list>

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_area, filter)" />
</template>

