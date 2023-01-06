<script setup lang="ts">
import { computed, defineProps, watch } from 'vue'
import { ExceptionResponse } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import JovenDetails from './JovenDetails.vue'
import type { JovenModel } from '~/backed_services/models/joven.model'
import AvalPlantillaServices from '~/backed_services/aval.services'

interface Props {
  joven: JovenModel
}
const props = defineProps<Props>()
const aval = ref('El joven no cuenta con avales en el sistema')
const isLoading = ref(false)
const userAvalServices = AvalPlantillaServices.UserAvalServices

async function loadAval(joven_id: number) {
  try {
    activateLoading(isLoading)
    const avalModel = await userAvalServices.retrieve_aval(joven_id)
    aval.value = avalModel.texto
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)

    if (error.httpCode === 404)
      aval.value = 'El joven no cuenta con avales en el sistema'
  }
  desactivateLoading(isLoading)
}

if (props.joven.aval)
  loadAval(props.joven.id)

watch(props, () => {
  loadAval(props.joven.id)
})
</script>

<template>
  <p v-html="aval" />
</template>
