<script setup lang="ts">
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import loading, { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { ExceptionResponse, ServerError } from '~/globals/config/axios'
import AvalServices from '~/backed_services/aval.services'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

const plantillas = ref<PlantillaAvalModel[]>([])
const isLoading = loading()
const showModal = ref(false)

const PlantillaServices = AvalServices.PlantillaServices

async function loadPlantillas() {
  activateLoading(isLoading)
  try {
    const response = await PlantillaServices.all_plantillas()
    plantillas.value = response
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

async function plantillaCreated() {
  showModal.value = false
  ElNotification.success({ message: 'Plantilla de Aval creada correctamente' })
  await loadPlantillas()
}

loadPlantillas()
</script>

<template>
  <h3>Gestion de Plantillas de Aval</h3>
  <el-row>
    <el-col :offset="22">
      <button type="button" class="btn btn-primary uk-text-bold" @click="showModal = true">
        <i class="entypo-list-add" data-test="add-api-key" /> Nuevo
      </button>
    </el-col>
  </el-row>
  <plantilla-aval-list :data="plantillas" @item-deleted="loadPlantillas" @item-updated="loadPlantillas" />

  <el-dialog v-model="showModal" title="Crear Plantilla de Aval" @close="loadPlantillas">
    <plantilla-aval-form @cancel="showModal = false" @success="plantillaCreated" />
  </el-dialog>
</template>
