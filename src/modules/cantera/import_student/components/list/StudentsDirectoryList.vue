<template>
  <p>Listado de Estudiantes sin Importar al Sistema</p>
  <el-row>
    <el-col :offset="20">
      <button type="button"
              class="btn btn-primary uk-text-bold"
              @click="importSelectedStudents()"
              :class="{'disabled':!selectedStudents.length}">
        <loading v-if="isImportSelectedLoading"/>
        <i class="entypo-list-add" v-else/> Importar Seleccionados
      </button>
    </el-col>
  </el-row>

  <el-table :data="students"
            @selection-change="handleTableSelection">
    <el-table-column type="selection" width="55" />
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.first_name + ' ' + scope.row.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email"/>
    <el-table-column label="Area" prop="area"/>
    <el-table-column label="Año Academico" prop="anno"/>

    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
            @on-confirm="importStudent(scope.row)"
            buttonTitle="Importar"
            title="¿Esta seguro que desea importar el estudiante?"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {toogleLoadingDecorator} from "~/globals/composables/useLoading"
import {ElTable} from "element-plus"
import DirectoryServices from "@/services/directory.services"
import {
  checkIsAuthenticateAndChangeStorage,
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndMessage,
  checkServerErrorAndRedirect
} from "~/helpers/utils"
import {StudentsDirectoryModel} from "~/services/models/directorio/students.directory.model";

const students = ref([] as StudentsDirectoryModel[])
const selectedStudents = ref([] as StudentsDirectoryModel[])
const isLoadingTable = ref(false)
const isImportSelectedLoading = ref(false)

let updateTable = async () => {
  const response = await DirectoryServices.studentsWithoutImport()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    students.value = response.data as StudentsDirectoryModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)

function handleTableSelection(val:StudentsDirectoryModel[]){
  selectedStudents.value = val
}



async function importStudent(item: StudentsDirectoryModel){
  const response = await DirectoryServices.importStudents([item.id])
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)){
    await updateTable()
    ElMessage.success("Estudiante Importado Correctamente")
  }
}
let importSelectedStudents = async () => {
  const items:number[] =[]
  selectedStudents.value.forEach(i=>items.push(i.id))
  const response = await DirectoryServices.importStudents(items)
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    await updateTable()
    ElMessage.success("Estudiantes Importados Correctamente")
  }
}
importSelectedStudents = toogleLoadingDecorator(importSelectedStudents,isImportSelectedLoading)





updateTable()
</script>