<template>
  <el-table :data="tutorRequest">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.graduado.first_name + ' ' + scope.row.graduado.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="graduado.email"/>
    <el-table-column label="Direccion" prop="graduado.direccion"/>
    <el-table-column label="Area Solicitud" prop="area"/>
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
          'fa fa-check-circle text-success':scope.row.graduado.esNivelSuperior,
          'fa fa-circle-o text-danger':!scope.row.graduado.esNivelSuperior
        }"/>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <simple-button buttonTitle="Responder Solicitud"
                       :ref="registerArrayRefs(assignButtonsRef)"
                       @click="onClickAssignButton(scope)"
                       buttonIcon="entypo-plus"/>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup lang="ts">
import isLoadingTable,{toogleLoadingDecorator} from "~/globals/composables/useLoading"
import {
  checkIsAuthenticateAndChangeStorage,
  checkIsAuthenticateAndRedirect, checkServerErrorAndMessage,
  checkServerErrorAndRedirect
} from "~/helpers/utils"
import FormacionServices from "~/services/formacion.services"
import GraduatedModel from "~/services/models/graduated.model"
import {newArrayRef, registerArrayRefs} from "~/globals/composables/useRegisterArrayRef"
import {TutorRequestModel} from "~/services/models/tutorrequest.model";

isLoadingTable.value = true
const tutorRequest = ref([] as TutorRequestModel[])
const selectedGraduate = ref<TutorRequestModel | undefined>()
const assignButtonsRef = newArrayRef()
const show  = ref(false)


let updateTable = async () => {
  const response = await FormacionServices.tutoriaService.listExternalTutorsRequestRecived()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    tutorRequest.value = response.data as TutorRequestModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)



updateTable()
</script>