<script setup lang="ts">
import { ElTable } from 'element-plus'
import { toogleLoadingDecorator } from '~/globals/composables/useLoading'
import type { GraduatedDirectoryModel } from '~/services/models/directorio/graduatedirectory.model'
import DirectoryServices from '~/services/directory.services'
import {
  checkIsAuthenticateAndChangeStorage,
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndMessage,
  checkServerErrorAndRedirect,
} from '~/helpers/utils'

const graduates = ref([] as GraduatedDirectoryModel[])
const selectedGraduates = ref([] as GraduatedDirectoryModel[])
const isLoadingTable = ref(false)
const isImportSelectedLoading = ref(false)

let updateTable = async () => {
  const response = await DirectoryServices.graduatesWithoutImport()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    graduates.value = response.data as GraduatedDirectoryModel[]
}
updateTable = toogleLoadingDecorator(updateTable, isLoadingTable)
function handleTableSelection(val: GraduatedDirectoryModel[]) {
  selectedGraduates.value = val
}

async function importGraduate(item: GraduatedDirectoryModel) {
  const response = await DirectoryServices.importGraduates([item.id])
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    await updateTable()
    ElMessage.success('Graduado Importado Correctamente')
  }
}
let importSelectedGraduates = async () => {
  const items: number[] = []
  selectedGraduates.value.forEach(i => items.push(i.id))
  const response = await DirectoryServices.importGraduates(items)
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    await updateTable()
    ElMessage.success('Graduados Importados Correctamente')
  }
}
importSelectedGraduates = toogleLoadingDecorator(importSelectedGraduates, isImportSelectedLoading)

updateTable()
</script>

<template>
  <p>Listado de Graduados sin Importar al Sistema</p>
  <el-row>
    <el-col :offset="20">
      <button
        type="button"
        class="btn btn-primary uk-text-bold"
        data-test="btn-import-data"
        :class="{ disabled: !selectedGraduates.length }"
        @click="importSelectedGraduates()"
      >
        <loading v-if="isImportSelectedLoading" />
        <i v-else class="entypo-list-add" /> Importar Seleccionados
      </button>
    </el-col>
  </el-row>

  <el-table
    :data="graduates"
    @selection-change="handleTableSelection"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ `${scope.row.first_name} ${scope.row.last_name}` }}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email" />
    <el-table-column label="Area" prop="area" />
    <el-table-column label="Externo">
      <template #default="scope">
        <i
          :class="{
            'fa fa-check-circle text-success': scope.row.esExterno,
            'fa fa-circle-o text-danger': !scope.row.esExterno,
          }"
        />
      </template>
    </el-table-column>
    <el-table-column label="Nivel Superior">
      <template #default="scope">
        <i
          :class="{
            'fa fa-check-circle text-success': scope.row.esNivelSuperior,
            'fa fa-circle-o text-danger': !scope.row.esNivelSuperior,
          }"
        />
      </template>
    </el-table-column>

    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
          button-title="Importar"
          button-icon="entypo-plus"
          title="¿Esta seguro que desea importar el graduado?"
          @on-confirm="importGraduate(scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>
