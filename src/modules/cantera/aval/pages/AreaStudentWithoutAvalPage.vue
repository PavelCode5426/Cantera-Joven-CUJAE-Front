<script setup lang="ts">
import isLoadingTable, { toogleLoadingDecorator } from '~/globals/composables/useLoading'
import {
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndRedirect,
} from '~/helpers/utils'
import canteraServices from '~/services/cantera.services'
import type StudentModel from '~/services/models/student.model'

isLoadingTable.value = true
const students = ref([] as StudentModel[])
const showCreateForm = ref(false)

let updateTable = async () => {
  const response = await canteraServices.listAreaStudentsWithoutAval()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    students.value = response.data as StudentModel[]
}

async function onSuccessCreateAval() {
  ElMessage.success({ message: 'Aval creado correctamente' })
  await updateTable()
}

provide('closeCreateDialog', () => {
  showCreateForm.value = false
})

updateTable = toogleLoadingDecorator(updateTable, isLoadingTable)
updateTable()
</script>

<template>
  <simple-page-header title="Listado de Estudiantes sin Aval" />
  <student-simple-table :students="students" />

  <create-aval-form :dialog-visible="showCreateForm" @on-success-create="onSuccessCreateAval()" />
</template>

