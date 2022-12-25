<script setup lang="ts">
import { provide, ref } from 'vue'
import { ElMessage } from 'element-plus'
import usePaginateResponse from '../../../globals/composables/usePaginateResponse'
import { Filter } from '../../../backed_services/service'
import type { PaginateResponse } from '~/globals/config/axios'
import { ExceptionResponse, ServerError } from '~/globals/config/axios'
import AKeyService from '~/backed_services/apikey.service'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect, getRealativeTime } from '@/helpers/utils'
import loadingTable, { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import type { ApikeyModel } from '~/backed_services/models/apikey.model'

const apiKeys = usePaginateResponse<ApikeyModel>()
const showCreateForm = ref<boolean>(false)
const isLoading = loadingTable()

async function loadApiKeys(page = 1) {
  activateLoading(isLoading)
  try {
    const response = await AKeyService.list_apikey(new Filter(page))
    response.results.forEach(i => i.expired_at = i.expired_at ? getRealativeTime(i.expired_at) : 'Nunca')
    apiKeys.value = response
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

async function deleteItem(id: number) {
  activateLoading(isLoading)
  try {
    const response = await AKeyService.delete_apikey(id)
    await loadApiKeys()
    ElMessage.success({ message: 'Elemento eliminado correctamente' })
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)

    if (error.httpCode === 404)
      ElMessage.error({ message: 'Elemento no encontrado' })
  }

  desactivateLoading(isLoading)
}

async function onSuccessCreateApiKey() {
  ElMessage.success({ message: 'Credenciales creados correctamente' })
  await loadApiKeys()
}

provide('closeCreateDialog', () => {
  showCreateForm.value = false
})

loadApiKeys()
</script>

<template>
  <h3>Gestion de Credenciales de Acceso</h3>
  <el-row>
    <el-col :offset="22">
      <button type="button" class="btn btn-primary uk-text-bold" @click="showCreateForm = !showCreateForm">
        <i class="entypo-list-add" data-test="add-api-key" /> Nuevo
      </button>
    </el-col>
  </el-row>
  <el-table v-loading="isLoading" :data="apiKeys.results" max-height="350">
    <el-table-column label="Etiqueta" prop="name" />
    <el-table-column label="Token de Acceso" prop="key" />
    <el-table-column label="Expira en" prop="expired_at" />
    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
          confirm-button-type="danger"
          button-title="Eliminar"
          button-type="btn-danger"
          button-icon=""
          title="¿Esta seguro que desea eliminar el elemento?"
          @on-confirm="deleteItem(scope.row.id)"
        />
      </template>
    </el-table-column>
  </el-table>
  <paginator :model="apiKeys" @current-change="loadApiKeys" />
  <create-api-key-form :dialog-visible="showCreateForm" @on-success-create="onSuccessCreateApiKey()" />
</template>
