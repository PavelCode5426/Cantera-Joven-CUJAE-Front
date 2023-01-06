<script setup lang="ts">
import { provide, ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutorAsignadoModel } from '../../../../backed_services/models/tutorial.model'
import { Filter } from '../../../../backed_services/service'
import type UserModel from '../../../../backed_services/models/user.model'
import { PosibleGraduadoModel } from '../../../../backed_services/models/posible_graduado.model'
import gestionarAreaServices, { PreubicacionFilter } from '../../../../backed_services/gestionar_area.services'
import UbicacionLaboralModel from '../../../../backed_services/models/ubicacion_laboral.model'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import type { UbicadosAreaModel } from '../../../../backed_services/models/ubicacion_laboral.model'
import AreaModel from '../../../../backed_services/models/area.model'
import AreaService from '../../../../backed_services/area.services'

const ubicaciones = ref<UbicadosAreaModel[]>([])
const showModal = ref(false)

async function loadUbicaciones() {
  try {
    const response = await gestionarAreaServices.get_ubicacion_laboral()
    ubicaciones.value = response.filter(i => i.ubicados.length > 0)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkIsAuthenticateAndRedirect(error)
    checkServerErrorAndRedirect(error)

    ElNotification.error(error.httpCode)
  }
}

async function onSuccessAprobarAsignacion() {
  ElNotification.success('Áreas revisadas')
  showModal.value = false
}

provide('closeCreateDialog', () => {
  showModal.value = false
})
loadUbicaciones()
</script>

<template>
  <h3>Asignación por áreas</h3>
  <el-collapse v-if="ubicaciones.length">
    <el-collapse-item v-for="ubicacion in ubicaciones" :title="ubicacion.area.nombre">
      <users-list :data="ubicacion.ubicados" />
    </el-collapse-item>
  </el-collapse>
  <h1 v-else>
    Sin nuevas ubicaciones
  </h1>
  <el-divider />
  <el-row justify="end">
    <el-col :span="6">
      <button type="button" class="btn btn-primary uk-text-bold" @click="showModal = true">
        Aprobar asignación
      </button>
    </el-col>
  </el-row>
  <el-dialog v-model="showModal">
    <aprobar-preubicacion-form :dialog-visible="showModal" @success="onSuccessAprobarAsignacion()" />
  </el-dialog>
</template>
