<template>
  <p>Listado de Posibles Graduados sin Importar al Sistema</p>
  <el-row>
    <el-col :offset="20">
      <button type="button"
              class="btn btn-primary uk-text-bold"
              @click="importSelectedPossiblyGraduate()"
              :class="{'disabled':!selectedPossiblyGraduates.length}">
        <loading v-if="isImportSelectedLoading"/>
        <i class="entypo-list-add" v-else/> Importar Seleccionados
      </button>
    </el-col>
  </el-row>

  <el-table :data="possiblyGraduates"
            @selection-change="handleTableSelection">
    <el-table-column type="selection" width="55" />
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.first_name + ' ' + scope.row.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email"/>
    <el-table-column label="Lugar Procedencia" prop="lugarProcedencia"/>

    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
            @on-confirm="importPossiblyGraduate(scope.row)"
            buttonTitle="Importar"
            title="¿Esta seguro que desea importar el posible graduado?"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {toogleLoadingDecorator} from "~/globals/composables/useLoading"
import {ElTable} from "element-plus"
import DirectoryServices from "@/services/directory.services"
import {PossiblyGraduatedDirectoryModel} from "~/services/models/directorio/possiblygraduated.directory.model";
import {
  checkIsAuthenticateAndChangeStorage,
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndMessage,
  checkServerErrorAndRedirect
} from "~/helpers/utils"

const possiblyGraduates = ref([] as PossiblyGraduatedDirectoryModel[])
const selectedPossiblyGraduates = ref([] as PossiblyGraduatedDirectoryModel[])
const isLoadingTable = ref(false)
const isImportSelectedLoading = ref(false)

let updateTable = async () => {
  const response = await DirectoryServices.possiblyGraduatesWithoutImport()
  console.log(response)
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    possiblyGraduates.value = response.data as PossiblyGraduatedDirectoryModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)

function handleTableSelection(val:PossiblyGraduatedDirectoryModel[]){
  selectedPossiblyGraduates.value = val
}



async function importPossiblyGraduate(item: PossiblyGraduatedDirectoryModel){
  const response = await DirectoryServices.importPossiblyGraduate([item.id])
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)){
    await updateTable()
    ElMessage.success("Posible Graduado Importado Correctamente")
  }
}
let importSelectedPossiblyGraduate = async () => {
  const items:number[] =[]
  selectedPossiblyGraduates.value.forEach(i=>items.push(i.id))
  const response = await DirectoryServices.importPossiblyGraduate(items)
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    await updateTable()
    ElMessage.success("Posibles Graduados Importados Correctamente")
  }
}
importSelectedPossiblyGraduate = toogleLoadingDecorator(importSelectedPossiblyGraduate,isImportSelectedLoading)





updateTable()
</script>