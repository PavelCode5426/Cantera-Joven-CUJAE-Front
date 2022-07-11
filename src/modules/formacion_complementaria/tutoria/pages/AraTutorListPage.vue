<template>
  <simple-page-header title="Listado de Tutores"/>
  <tutor-simple-table :tutors="tutors"/>
</template>
<script setup lang="ts">
import loadingTable, {toogleLoadingDecorator} from "~/globals/composables/useLoading"
import {checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect} from "~/helpers/utils"
import FormacionServices from "~/services/formacion.services"
import UserModel from "~/services/models/user.model"

loadingTable.value = true
const tutors = ref([] as UserModel[])

let updateTable = async () => {
  const response = await FormacionServices.tutoriaService.listAreaTutors()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    tutors.value = response.data as UserModel[]
}
updateTable = toogleLoadingDecorator(updateTable,loadingTable)

updateTable()
</script>