<template>
  <student-simple-table :students="students"/>
</template>

<script setup lang="ts">
import isLoadingTable,{toogleLoadingDecorator} from "~/globals/composables/useLoading"
import {
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndRedirect
} from "~/helpers/utils"
import {CanteraServices} from "~/services/cantera.services";
import StudentModel from "~/services/models/student.model"

isLoadingTable.value = true
const students = ref([] as StudentModel[])

let updateTable = async () => {
  const response = await CanteraServices.listAreaStudentsWithoutAval()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    students.value = response.data as StudentModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)
updateTable()
</script>