<script setup lang="ts">
import authServiceInstace from '@/services/auth.services'
import {
  checkIsAuthenticateAndChangeStorage,
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndMessage,
  checkServerErrorAndRedirect, getRealativeTime,
} from '@/helpers/utils'
import type ApiKeyModel from '~/services/models/apiKey.model'
import loadingTable, {
  activateLoading,
  desactivateLoading,
  toogleLoadingDecorator,
} from '~/globals/composables/useLoading'

const apiKeys = ref([] as ApiKeyModel[])
const showCreateForm = ref(false)

let updateTable = async () => {
  const response = await authServiceInstace.listApiKeys()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response)) {
    if (response.httpCode == 200) {
      const data = response.data
      data.forEach((item) => {
        if (item.expired_at)
          item.expired_at = getRealativeTime(item.expired_at)
        else item.expired_at = 'nunca'
      })
      apiKeys.value = data
    }
  }
}
updateTable = toogleLoadingDecorator(updateTable)

const deleteItem = async (id: number) => {
  activateLoading()
  const response = await authServiceInstace.deleteApiKey(id)
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    if (response.httpCode == 200) {
      apiKeys.value = apiKeys.value.filter(i => i.id != id)
      ElMessage.success({ message: 'Elemento eliminado correctamente' })
    }
    else { ElMessage.error({ message: 'Elemento no encontrado' }) }
  }
  desactivateLoading()
}

async function onSuccessCreateApiKey() {
  ElMessage.success({ message: 'Credenciales creados correctamente' })
  await updateTable()
}

provide('closeCreateDialog', () => {
  showCreateForm.value = false
})
updateTable()
</script>

<template>
  <h3>API KEYs</h3>
  <el-row>
    <el-col :offset="22">
      <button type="button" class="btn btn-primary uk-text-bold" @click="showCreateForm = !showCreateForm">
        <i class="entypo-list-add" data-test="add-api-key" /> Nuevo
      </button>
    </el-col>
  </el-row>
  <el-table :data="apiKeys" :load="loading">
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

  <!--  MODAL PARA CREAR -->
  <create-api-key-form :dialog-visible="showCreateForm" @on-success-create="onSuccessCreateApiKey()" />
</template>
