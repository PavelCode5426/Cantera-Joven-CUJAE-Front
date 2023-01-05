<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import FIndivServices from '../../../../backed_services/formacion_individual.services'
import { Paginate } from '../../../../backed_services/service'
import type { PropuestaMovimientoModel } from '../../../../backed_services/models/formacion_individual.model'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import loading, { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { ExceptionResponse, ServerError } from '~/globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'

const propuestas = usePaginateResponse<PropuestaMovimientoModel>()
const isLoading = loading()
const showModal = ref(false)
const paginate = ref(new Paginate(1))

async function loadData(paginate: Paginate) {
  activateLoading(isLoading)
  try {
    const response = await FIndivServices.list_propuestas_movimiento(paginate)
    propuestas.value = response
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

async function propuestaCreated() {
  showModal.value = false
  await changePageHandler()
  ElNotification.success({ message: 'Propuesta de movimiento creada correctamente' })
}
async function changePageHandler(page = 1) {
  paginate.value.page = page
  await loadData(paginate.value)
}

onMounted(changePageHandler)
</script>

<template>
  <h3>Gestion de Propuestas de Movimiento</h3>
  <el-row>
    <el-col :offset="22">
      <p-button button-type="success" button-title="Nuevo" button-icon="entypo-list-add" @click="showModal = true" />
    </el-col>
  </el-row>
  <propuesta-movimiento-list :data="propuestas.results" @item-deleted="loadData" @item-updated="loadData" />

  <paginator :model="propuestas" @current-change="changePageHandler" @reload="loadData(paginate)" />

  <el-dialog v-model="showModal" title="Crear propuesta de movimiento" @close="loadData">
    <propuesta-movimiento-form @cancel="showModal = false" @success="propuestaCreated" />
  </el-dialog>
</template>
