<template>
  <el-row>
    <el-table :data="tutors">
      <el-table-column label="Nombre y Apellido">
        <template #default="scope">
          {{scope.row.first_name + ' ' + scope.row.last_name}}
        </template>
      </el-table-column>
      <el-table-column label="Correo Electronico" prop="email"/>
      <el-table-column label="Direccion" prop="direccion"/>
    </el-table>
  </el-row>
</template>
<script setup lang="ts">
import loadingTable, {toogleLoadingDecorator} from "~/globals/composables/useLoading"
import {checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect} from "~/helpers/utils"
import FormacionServices from "~/services/formacion.services"
import UserModel from "~/services/models/user.model"

loadingTable.value = true
const tutors = ref([] as UserModel[])

let updateTable = async () => {
  const response = await FormacionServices.tutoriaService.listAreaTutors()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    tutors.value = response.data as UserModel[]
}
updateTable = toogleLoadingDecorator(updateTable,loadingTable)

updateTable()
</script>