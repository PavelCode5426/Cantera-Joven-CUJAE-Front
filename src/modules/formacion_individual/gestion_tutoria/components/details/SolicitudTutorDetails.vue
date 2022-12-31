<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import tutoriaServices from '../../../../../backed_services/tutoria.services'
import { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import SolicitudStatus from './SolicitudStatus.vue'
import type { SolicitudTutorModel } from '~/backed_services/models/tutorial.model'

interface Props {
  solicitud: SolicitudTutorModel | undefined
}

const props = defineProps<Props>()
const isLoading = ref(true)
const value = ref<SolicitudTutorModel>(undefined)

async function loadSolicitud(solicitud_id: number) {
  activateLoading(isLoading)
  try {
    value.value = await tutoriaServices.retrieve_solicitud(solicitud_id)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

watch(props, async (newValue) => {
  await loadSolicitud(newValue.solicitud.id)
})

loadSolicitud(props.solicitud.id)
</script>

<template>
  <el-descriptions>
    <el-descriptions-item label="Area solicitada">
      {{ value?.area.nombre }}
    </el-descriptions-item>
    <el-descriptions-item label="Respuesta">
      <solicitud-status v-if="value" :status="value.respuesta" />
    </el-descriptions-item>
    <el-descriptions-item label="Fecha de realizacion">
      {{ value?.fechaCreado }}
    </el-descriptions-item>
    <el-descriptions-item v-if="value?.fechaRespuesta" label="Fecha de respuesta">
      {{ value?.fechaRespuesta }}
    </el-descriptions-item>
    <el-descriptions-item label="Motivo solicitud">
      {{ value?.motivo_solicitud }}
    </el-descriptions-item>
    <el-descriptions-item v-if="value?.motivo_respuesta" label="Motivo respuesta">
      {{ value?.motivo_respuesta }}
    </el-descriptions-item>
  </el-descriptions>
</template>
