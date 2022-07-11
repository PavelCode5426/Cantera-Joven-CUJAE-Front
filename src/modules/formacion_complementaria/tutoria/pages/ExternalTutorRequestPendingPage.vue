<template>
  <simple-page-header title="Solicitudes de Tutor Pendientes"
                      description="Listado de graduados con solicitudes de tutor pendientes por responder en en su area"/>
  <request-tutors-list-table :tutorRequests="tutorRequests"/>
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
const tutorRequests = ref([] as TutorRequestModel[])
const selectedGraduate = ref<TutorRequestModel | undefined>()
const assignButtonsRef = newArrayRef()
const show  = ref(false)


let updateTable = async () => {
  const response = await FormacionServices.tutoriaService.listExternalTutorsRequestPending()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    tutorRequests.value = response.data as TutorRequestModel[]
}
updateTable = toogleLoadingDecorator(updateTable,isLoadingTable)



updateTable()
</script>