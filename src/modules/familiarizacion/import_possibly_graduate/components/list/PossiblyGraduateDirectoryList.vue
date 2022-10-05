<script setup lang="ts">
import { toogleLoadingDecorator } from '~/globals/composables/useLoading'
import DirectoryServices from '~/services/directory.services'
import type PossiblyGraduatedDirectoryModel from '~/services/models/directorio/possiblygraduated.directory.model'
import {
  checkIsAuthenticateAndChangeStorage,
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndMessage,
  checkServerErrorAndRedirect,
} from '~/helpers/utils'

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
updateTable = toogleLoadingDecorator(updateTable, isLoadingTable)

function handleTableSelection(val: PossiblyGraduatedDirectoryModel[]) {
  selectedPossiblyGraduates.value = val
}

async function importPossiblyGraduate(item: PossiblyGraduatedDirectoryModel) {
  const response = await DirectoryServices.importPossiblyGraduate([item.id])
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    await updateTable()
    ElMessage.success('Posible Graduado Importado Correctamente')
  }
}
let importSelectedPossiblyGraduate = async () => {
  const items: number[] = []
  selectedPossiblyGraduates.value.forEach(i => items.push(i.id))
  const response = await DirectoryServices.importPossiblyGraduate(items)
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    await updateTable()
    ElMessage.success('Posibles Graduados Importados Correctamente')
  }
}
importSelectedPossiblyGraduate = toogleLoadingDecorator(importSelectedPossiblyGraduate, isImportSelectedLoading)

updateTable()
</script>

<template>
  <p>Listado de Posibles Graduados sin Importar al Sistema</p>
  <el-row>
    <el-col :offset="20">
      <button
        type="button"
        class="btn btn-primary uk-text-bold"
        data-test="btn-import-data"
        :class="{ disabled: !selectedPossiblyGraduates.length }"

        @click="importSelectedPossiblyGraduate()"
      >
        <loading v-if="isImportSelectedLoading" />
        <i v-else class="entypo-list-add" /> Importar Seleccionados
      </button>
    </el-col>
  </el-row>
  <el-table
    :data="possiblyGraduates"
    @selection-change="handleTableSelection"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ `${scope.row.first_name} ${scope.row.last_name}` }}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email" />
    <el-table-column label="Lugar Procedencia" prop="lugarProcedencia" />

    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
          button-title="Importar"
          button-icon="entypo-plus"
          title="¿Esta seguro que desea importar el posible graduado?"
          @on-confirm="importPossiblyGraduate(scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>
