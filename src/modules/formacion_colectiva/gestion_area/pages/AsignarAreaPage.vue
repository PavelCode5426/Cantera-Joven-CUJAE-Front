<script setup lang="ts">
import { ref } from 'vue'

import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import gestionarAreaServices, {PreubicacionFilter} from '~/backed_services/gestionar_area.services'
import {PosibleGraduadoModel} from '~/backed_services/models/posible_graduado.model'

import AuthStore from '~/modules/authentication/store/auth.store'
import type { PaginateResponse } from '~/globals/config/axios'
import {ExceptionResponse, ServerError} from '~/globals/config/axios'
import UserModel from "../../../../backed_services/models/user.model";
import AreaModel from "../../../../backed_services/models/area.model";
import usePaginateResponse from "../../../../globals/composables/usePaginateResponse";
import {useRoute} from "vue-router";
import {ElNotification} from "element-plus";
import tutoriaServices, {
  AsignarSolicitarTutor,
  SolicitudTutorExterno,
  TutoriaFilter
} from "../../../../backed_services/tutoria.services";
import UbicacionLaboralModel, {UbicadosAreaModel} from "../../../../backed_services/models/ubicacion_laboral.model";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import AreaService from "../../../../backed_services/area.services";
import {TutorAsignadoModel} from "../../../../backed_services/models/tutorial.model";

interface Preubicacion {
  area: AreaModel
  ubicados: PosibleGraduadoModel[]
}

const posibles_graduados_init = usePaginateResponse<PosibleGraduadoModel>()
const posibles_graduados = ref<usePaginateResponse<PosibleGraduadoModel>>()
const selectedPosiblesGraduados = ref([])
const areas = ref<AreaModel[]>([])
const selectedArea = ref([])
const route = useRoute()


const preubicados = ref<UbicadosAreaModel[]>([])

async function loadDataPG(filter: PreubicacionFilter) {
  try {
    const response: PaginateResponse<UserModel> = await gestionarAreaServices.get_pgraduados(filter)
    posibles_graduados_init.value = response.results
  }
  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Error')
    else ElNotification.error(error.detail)
  }
}

async function loadAreas() {
  try {
    const response = await AreaService.all_areas()
    areas.value = response.results
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function loadAsignados(area_id: number) {
  const preubicados: UbicadosAreaModel[] = []
  try {
    const filter = new PreubicacionFilter(1, 500)
    filter.is_preubicado = false
    let response = await gestionarAreaServices.get_pgraduados(filter)
    preubicados.ubicados.push(...response.results)

    while (response.next !== null) {
      preubicados.ubicados.push(...response.results)
      filter.page++
      response = await gestionarAreaServices.get_pgraduados(filter)
    }

    posibles_graduados.value = posibles_graduados_init
    preubicados.forEach((i) => {
      if (!posibles_graduados_init.find(item => item.id === i.ubicados.id))
        posibles_graduados.value.push(i.ubicados)
    })

    selectedPosiblesGraduados.value = []
    preubicados.forEach(item => selectedPosiblesGraduados.value.push(item.ubicados.id))
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
loadDataPG(filter)
loadAreas()
loadAsignados(Preubicacion.area.id)
</script>

<template>
  <h3>Aignación de posibles graduados a áreas</h3>
    <el-select v-model="area.id" placeholder="Filtrar por area">
      <el-option v-for="item in areas" :key="item.id" :value="item.id" :label="item.nombre" />
    </el-select>
  <el-transfer
      :v-model="posibles_graduados.results"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="Posible graduado"
      users-list :data="posibles_graduados_init.results"
  />
</template>>

