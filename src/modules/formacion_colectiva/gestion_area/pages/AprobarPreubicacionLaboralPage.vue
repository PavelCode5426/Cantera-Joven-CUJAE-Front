<script setup lang="ts">
import {provide, ref} from 'vue'
import {ElMessage, ElNotification} from 'element-plus'
import { useRoute } from 'vue-router'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import type { PaginateResponse } from '../../../../globals/config/axios'
import { ExceptionResponse, ServerError } from '../../../../globals/config/axios'
import type { TutorAsignadoModel } from '../../../../backed_services/models/tutorial.model'
import { Filter } from '../../../../backed_services/service'
import type UserModel from '../../../../backed_services/models/user.model'
import {PosibleGraduadoModel} from "../../../../backed_services/models/posible_graduado.model";
import gestionarAreaServices, {PreubicacionFilter} from "../../../../backed_services/gestionar_area.services";
import UbicacionLaboralModel from "../../../../backed_services/models/ubicacion_laboral.model";
import tutoriaServices, {
  SolicitudTutorExterno,
  SolicitudTutoriaFilter
} from "../../../../backed_services/tutoria.services";
import AuthStore from "../../../authentication/store/auth.store";
import {checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect} from "../../../../helpers/utils";
import {UbicadosAreaModel} from "../../../../backed_services/models/ubicacion_laboral.model";
import AreaModel from "../../../../backed_services/models/area.model";
import AreaService from "../../../../backed_services/area.services";

const ubicaciones = ref<UbicadosAreaModel[]>([])
const showCreateForm = ref<boolean>(false)

async function loadUbicaciones() {
  try {
    const response = await gestionarAreaServices.get_ubicacion_laboral()
    ubicaciones.value = response.filter(i=>i.ubicados.length>0)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkIsAuthenticateAndRedirect(error)
    checkServerErrorAndRedirect(error)

    ElNotification.error(error.httpCode)
  }
}

provide('closeCreateDialog', () => {
  showCreateForm.value = false
})

loadUbicaciones()
</script>

<template>
  <h3>Asignación por áreas</h3>
  <el-collapse v-if="ubicaciones.length">
    <el-collapse-item v-for="ubicacion in ubicaciones" :title="ubicacion.area.nombre">
      <users-list :data="ubicacion.ubicados"/>
    </el-collapse-item>
  </el-collapse>
  <h1 v-else>Sin nuevas ubicaciones</h1>
  <el-divider />
  <el-row justify="end">
    <el-col :span="6">
      <button type="button" class="btn btn-primary uk-text-bold" @click="showCreateForm = !showCreateForm">
        <i class="entypo:new-message" data-test="aprobar-preubicacion-form" /> Aprobar asignación
      </button>
    </el-col>
  </el-row>
  <aprobar-preubicacion-form :dialog-visible="showCreateForm"/>
</template>

