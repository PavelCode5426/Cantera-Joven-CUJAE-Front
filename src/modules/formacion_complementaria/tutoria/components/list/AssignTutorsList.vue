<template>
  <el-table :data="graduatesWithoutTutors">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.first_name + ' ' + scope.row.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email"/>
    <el-table-column label="Direccion" prop="direccion"/>
    <el-table-column label="Externo">
      <template #default="scope">
        <i :class="{
          'fa fa-check-circle text-success':scope.row.esExterno,
          'fa fa-circle-o text-danger':!scope.row.esExterno,
        }"/>
      </template>
    </el-table-column>
    <el-table-column label="Nivel Superior">
      <template #default="scope">
        <i :class="{
          'fa fa-check-circle text-success':scope.row.esNivelSuperior,
          'fa fa-circle-o text-danger':!scope.row.esNivelSuperior
        }"/>
      </template>
    </el-table-column>
    <el-table-column label="Aval">
      <template #default="scope">
        <el-tag v-if="scope.row.aval" type="success">Aval Listo</el-tag>
        <el-tag v-else type="danger">Sin Aval</el-tag>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">

      </template>
    </el-table-column>
  </el-table>



</template>

<script setup lang="ts">
import isLoadingTable,{toogleLoadingDecorator} from "~/globals/composables/useLoading"
import {
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndRedirect
} from "~/helpers/utils"
import FormacionServices from "~/services/formacion.services"
import GraduatedModel from "~/services/models/graduated.model"

isLoadingTable.value = true
const graduatesWithoutTutors = ref([] as GraduatedModel[])
const selectedGraduate = ref<GraduatedModel | undefined>()
const showAssignForm = ref(false)



let updateTable = async () => {
  const response = await FormacionServices.tutoriaService.listAreaGraduatesWithoutTutor()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    graduatesWithoutTutors.value = response.data as GraduatedModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)




















updateTable()
</script>