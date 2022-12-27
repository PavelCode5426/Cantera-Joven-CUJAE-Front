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
const aval = ref('')
const isLoading = ref(false)
const userAvalServices = AvalPlantillaServices.UserAvalServices

async function loadAval(joven_id: number) {
  try {
    activateLoading(isLoading)
    aval.value = await userAvalServices.retrieve_aval(joven_id).texto
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
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
