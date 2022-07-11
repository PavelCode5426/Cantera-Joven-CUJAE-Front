<template>
  <simple-page-header title="Listado de Graduados"/>
  <graduated-simple-table :graduates="graduates"/>
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
const graduates = ref([] as GraduatedModel[])

let updateTable = async () => {
  const response = await FormacionServices.tutoriaService.listAreaGraduates()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    graduates.value = response.data as GraduatedModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)
updateTable()
</script>