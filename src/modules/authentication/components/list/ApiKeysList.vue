<template>
  <h3>API KEYs</h3>
  <el-row>
    <el-col :offset="22">
      <button type="button" class="btn btn-primary uk-text-bold" @click="showCreateForm = !showCreateForm">
        <i class="entypo-list-add"/> Añadir
      </button>
    </el-col>
  </el-row>
  <el-table :data="apiKeys">
    <el-table-column label="Etiqueta" prop="name"/>
    <el-table-column label="Token de Acceso" prop="key"/>
    <el-table-column label="Expira en" prop="expired_at"/>
    <el-table-column align="right">
      <template #default="scope">
        <button type="button" class="btn btn-danger uk-text-bold">
          <i class="entypo-cancel"/>
        </button>
      </template>
    </el-table-column>
  </el-table>
  <!--  MODAL PARA CREAR -->
  <create-api-key-form :dialogVisible="showCreateForm"/>

</template>
<script setup lang="ts">
//import authServiceInstace from "@/services/auth.services"
//import {checkServerError} from "~/helpers/utils"
//import {checkIsAuthenticate} from "~/helpers/utils"

// let apiKeys = await authServiceInstace.listApiKeys()
// checkServerError(apiKeys)
// checkIsAuthenticate(apiKeys)

//apiKeys = ref(apiKeys.data)

import apilist from '@/test/apikey.json' //TODO BORRAR ESTO
const apiKeys = ref(apilist)

const showCreateForm = ref(false)

provide('closeCreateDialog',()=>{
  showCreateForm.value = false
})
</script>