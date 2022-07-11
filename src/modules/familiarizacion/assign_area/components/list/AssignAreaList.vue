<template>
  <el-table :data="pgWithoutArea">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.first_name + ' ' + scope.row.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email"/>
    <el-table-column label="Direccion" prop="direccion"/>
    <el-table-column>
      <template #default="scope">
        <simple-button buttonTitle="Asignar Area"
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
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndRedirect
} from "~/helpers/utils"
import PossiblegraduateModel from "~/services/models/possiblegraduate.model";
import {newArrayRef, registerArrayRefs} from "~/globals/composables/useRegisterArrayRef"
import familiarizacionServices from "~/services/familiarizacion.services";

isLoadingTable.value = true
const pgWithoutArea = ref([] as PossiblegraduateModel[])
const selectedGraduate = ref<PossiblegraduateModel | undefined>()
const showAssignForm = ref(false)
const assignButtonsRef = newArrayRef()

let updateTable = async () => {
  const response = await familiarizacionServices.ListarPosibleGraduadoNoPreubicado()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    pgWithoutArea.value = response.data as PossiblegraduateModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)

async function onClickAssignButton(tableRow:any){
  const btnIndex = tableRow.$index
  const assingButtonRef = assignButtonsRef.value[btnIndex]

  assingButtonRef.activateLocalLoading()
}

updateTable()
</script>