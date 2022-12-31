<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import tutoriaServices from '../../../../backed_services/tutoria.services'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutorAsignadoModel } from '../../../../backed_services/models/tutorial.model'
import { Filter } from '../../../../backed_services/service'
import type UserModel from '../../../../backed_services/models/user.model'

const data = usePaginateResponse<TutorAsignadoModel>()
const filters = ref<Filter>(new Filter())
const route = useRoute()
const current_area = route.params.id

async function loadData(id: number, filter: Filter) {
  try {
    const response: PaginateResponse<UserModel> = await tutoriaServices.all_tutors_in_area(id, filter)
    data.value = response
  }
  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Ha seleccionado un area incorrecto')
    else ElNotification.error(error.detail)
  }
}

async function handleCurrentPageChange(page = 1) {
  filters.value.page = page
  await loadData(current_area, filters.value)
}

handleCurrentPageChange(1)
</script>

<template>
  <h3>Tutores del Area</h3>
  <filter-form v-model:filter="filters" @submit="loadData(current_area, filters)" />

  <users-list :data="data.results">
    <template #default>
      <el-table-column>
        <template #default="scope">
          <router-link :to="{ name: 'tutorados-asignados-page', params: { id: scope.row.id } }">
            <el-button>
              Ver tutorados
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </template>
  </users-list>

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_area, filters)" />
</template>
