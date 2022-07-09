<template>
  <h3>API KEYs</h3>
  <el-row>
    <el-col :offset="22">
      <button type="button" class="btn btn-primary uk-text-bold" @click="showCreateForm = !showCreateForm">
        <i class="entypo-list-add"/> Añadir
      </button>
    </el-col>
  </el-row>
  <el-table :data="apiKeys" :load="loading">
    <el-table-column label="Etiqueta" prop="name"/>
    <el-table-column label="Token de Acceso" prop="key"/>
    <el-table-column label="Expira en" prop="expired_at"/>
    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
            confirmButtonType="danger"
            @on-confirm="deleteItem(scope.row.id)"
            title="¿Esta seguro que desea eliminar el elemento?"/>
      </template>
    </el-table-column>
  </el-table>

  <!--  MODAL PARA CREAR -->
  <create-api-key-form :dialogVisible="showCreateForm" @on-success-create="onSuccessCreateApiKey()"/>

</template>
<script setup lang="ts">
import authServiceInstace from "@/services/auth.services"
import {
  checkIsAuthenticateAndChangeStorage,
  checkServerErrorAndMessage,
  checkServerErrorAndRedirect,
  checkIsAuthenticateAndRedirect
} from "@/helpers/utils"
import ApiKeyModel from "~/services/models/apiKey.model"
import loadingTable, {
  activateLoading,
  desactivateLoading,
  toogleLoadingDecorator
} from "~/globals/composables/useLoading";

import apilist from '@/test/apikey.json' //TODO BORRAR ESTO

const apiKeys = ref([] as ApiKeyModel[])
const showCreateForm = ref(false)

let updateTable = async () => {
  let response = await authServiceInstace.listApiKeys()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    if (response.httpCode == 200)
      apiKeys.value = response.data
}
updateTable = toogleLoadingDecorator(updateTable)

let updateTableTest = async () => {
  apiKeys.value = apilist
}
updateTableTest = toogleLoadingDecorator(updateTableTest)

let deleteItem = async (id:number) => {
  activateLoading()
  const response = await authServiceInstace.deleteApiKey(id)
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response))
    if(response.httpCode == 200) {
      apiKeys.value = apiKeys.value.filter(i => i.id != id)
      ElMessage.success({message: "Elemento eliminado correctamente"})
    }
    else ElMessage.error({message: "Elemento no encontrado"})
  desactivateLoading()
}

function onSuccessCreateApiKey(){
  ElMessage.success({message:"Credenciales creados correctamente"})
}



provide('closeCreateDialog',()=>{
  showCreateForm.value = false
})
// updateTable()
updateTableTest()
</script>