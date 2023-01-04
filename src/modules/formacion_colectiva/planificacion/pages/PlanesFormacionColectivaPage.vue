<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import FColectivaServices from '../../../../backed_services/formacion_colectiva.services'
import {
  EstadoPlanFormacionColectiva,
  PlanFormacionColectivaModel
} from '../../../../backed_services/models/formacion_colectiva.model'
import {Filter} from "../../../../backed_services/service";
import PlanFormacionColectivaList from "../components/lists/PlanFormacionColectivaList.vue";

const data = usePaginateResponse<PlanFormacionColectivaModel>()
const filter = ref<Filter>(new Filter())
const route = useRoute()
const router = useRouter()
const current_user = route.params.id

async function loadData(filter: Filter) {
  try {
    const response: PaginateResponse<PlanFormacionColectivaModel> = await FColectivaServices.all_planes_formacion(filter)
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
  await loadData(filter)
}
handleCurrentPageChange(1)

async function createPlanFormacionColectiva() {
  const response = await ElMessageBox.confirm(`¿Está seguro de crear un nuevo Plan de Formación Complementaria?`, 'Alerta')
  try {
    if (response) {
      const plan_formacion = await FColectivaServices.create_plan_formacion()
      ElNotification.success('Plan de Formación Colectivo creado correctamente')
      router.push({ name: 'plan-formacion-colectiva-page', params: { id: plan_formacion.id } })
    }
  }
  catch (error: ExceptionResponse | ServerError) {
    ElNotification.error(error.detail)
  }
}
</script>

<template>
  <h3>Planes de Formación Colectiva</h3>
  <plan-formacion-colectiva-list :data="data.results">
    <template #default>
      <el-table-column>
        <template #default="scope">
          <router-link v-if="scope.row.estado === EstadoPlanFormacion.desarrollo" :to="{ name: 'plan-formacion-colectiva-page', params: { id: scope.row.id } }">
            <el-button>
              Editar Planificación
            </el-button>
          </router-link>
          <router-link v-else :to="{ name: 'plan-formacion-colectiva-page', params: { id: scope.row.id  } }">
            <el-button>
              Revisar Planificacion
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </template>
  </plan-formacion-colectiva-list>

  <el-row justify="end">
    <el-button @click="createPlanFormacionColectiva()">
      Crear Planificacion
    </el-button>
  </el-row>
  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(filters)"/>
</template>

