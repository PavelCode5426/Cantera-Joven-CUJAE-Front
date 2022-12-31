<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import type { JovenModel } from '../../../../backed_services/models/joven.model'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import tutoriaServices, { TutoriaFilter } from '../../../../backed_services/tutoria.services'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutoradoAsignadoModel } from '../../../../backed_services/models/tutorial.model'
import FIndivServices from '../../../../backed_services/formacion_individual.services'
import { EstadoPlanFormacion } from '../../../../backed_services/models/formacion_individual.model'

const data = usePaginateResponse<TutoradoAsignadoModel>()
const filters = ref<TutoriaFilter>(new TutoriaFilter())
filters.value.revocation = false
const route = useRoute()
const router = useRouter()
const current_user = route.params.id

async function loadData(id: number, filter: TutoriaFilter) {
  try {
    const response: PaginateResponse<TutoradoAsignadoModel> = await tutoriaServices.all_tutorados_from_tutor(id, filter)
    data.value = response
  }
  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Ha seleccionado un tutor incorrecto')
    else ElNotification.error(error.detail)
  }
}
async function handleCurrentPageChange(page = 1) {
  filters.value.page = page
  await loadData(current_user, filters.value)
}
handleCurrentPageChange(1)

async function createPlanFormacion(joven: JovenModel) {
  const response = await ElMessageBox.confirm(`¿Esta seguro de crear un Plan de Formacion para ${joven.first_name} ${joven.last_name}?`, 'Alerta')
  try {
    if (response) {
      const plan_formacion = await FIndivServices.create_plan_formacion_from_joven(joven.id)
      ElNotification.success('Plan de Formacion Individual creado correctamente')
      router.push({ name: 'plan-formacion-page', params: { id: plan_formacion.id } })
    }
  }
  catch (error: ExceptionResponse | ServerError) {
    ElNotification.error(error.detail)
  }
}
</script>

<template>
  <h3>Planes de Tutorados</h3>
  <planificacion-filter-form v-model:filter="filters" @submit="loadData(current_user, filters)" />

  <tutorados-plan-formacion-list :data="data.results">
    <el-table-column label="Estado">
      <template #default="{ row }">
        <estado-elemento v-if="row?.joven?.plan === null" estado="Sin Plan" />
        <estado-elemento v-else-if="row?.joven.plan" :estado="row?.joven.plan?.estado" />
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="{ row }">
        <el-button v-if="row?.joven?.plan === null" @click="createPlanFormacion(row?.joven)">
          Crear Planificacion
        </el-button>
        <router-link v-else-if="row?.joven.plan?.estado === EstadoPlanFormacion.desarrollo" :to="{ name: 'plan-formacion-page', params: { id: row?.joven?.plan?.id } }">
          <el-button>
            Editar Planificacion
          </el-button>
        </router-link>
        <router-link v-else :to="{ name: 'plan-formacion-page', params: { id: row?.joven.plan?.id } }">
          <el-button>
            Revisar Planificacion
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </tutorados-plan-formacion-list>

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_user, filters)" />
</template>
