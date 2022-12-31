<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import type { JovenModel } from '../../../../backed_services/models/joven.model'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutoradoAsignadoModel } from '../../../../backed_services/models/tutorial.model'
import gestionarAreaServices from '../../../../backed_services/gestionar_area.services'
import UbicacionLaboralModel from '../../../../backed_services/models/ubicacion_laboral.model'
import PreubicacionFilter from '../../../../backed_services/gestionar_area.services'
import Filter from '../../../../backed_services/service'
import UserModel from "../../../../backed_services/models/user.model";
import PreubicadosAreaList from "../components/list/PGPreubicadosAreaList.vue";
import PGPreubicadosAreaList from "../components/list/PGPreubicadosAreaList.vue";

const data = usePaginateResponse<UbicacionLaboralModel>()
const filter = ref<Filter>(new Filter())
const route = useRoute()
const current_area = route.params.id

async function loadData(id: number, filter: Filter) {
  try {
    const response: PaginateResponse<UbicacionLaboralModel> = await gestionarAreaServices.preubicados_area(id, filter)
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
  await loadData(current_area)
}

handleCurrentPageChange(1)
</script>

<template>
  <h3>Posibles graduados preubicados</h3>

  <users-list :data="data.results" />

  <paginator :model="data" @current-change="handleCurrentPageChange" @reload="loadData(current_area, filter)" />
</template>
