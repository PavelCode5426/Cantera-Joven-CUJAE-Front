<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import FIndivServices from '../../../../backed_services/formacion_individual.services'
import { Paginate } from '../../../../backed_services/service'
import type { DimensionModel } from '../../../../backed_services/models/formacion_individual.model'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import loading, { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { ExceptionResponse, ServerError } from '~/globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'

const dimensiones = usePaginateResponse<DimensionModel>()
const isLoading = loading()
const showModal = ref(false)
const paginate = ref(new Paginate())

async function loadData(paginate: Paginate) {
  activateLoading(isLoading)
  try {
    const response = await FIndivServices.list_dimensiones(paginate)
    dimensiones.value = response
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

async function dimensionCreated() {
  showModal.value = false
  ElNotification.success({ message: 'Dimension creada correctamente' })
  await changePageHandler(1)
}

async function changePageHandler(page = 1) {
  paginate.value.page = page
  await loadData(paginate.value)
}

onMounted(changePageHandler)
</script>

<template>
  <h3>Gestion de Dimensiones</h3>
  <el-row>
    <el-col :offset="22">
      <p-button button-type="success" button-title="Nuevo" button-icon="entypo-list-add" @click="showModal = true" />
    </el-col>
  </el-row>
  <dimension-list :data="dimensiones.results" @item-deleted="loadData" @item-updated="loadData" />
  <paginator :model="dimensiones" @current-change="changePageHandler" @reload="loadData(paginate)" />

  <el-dialog v-model="showModal" title="Crear dimension" @close="loadData">
    <dimension-form @cancel="showModal = false" @success="dimensionCreated" />
  </el-dialog>
</template>
