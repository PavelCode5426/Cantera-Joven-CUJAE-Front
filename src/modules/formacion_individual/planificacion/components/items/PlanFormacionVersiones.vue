<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import type { PlanFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import usePaginateResponse from '../../../../../globals/composables/usePaginateResponse'
import type ArchivoModel from '../../../../../backed_services/models/archivo.model'
import { Paginate } from '../../../../../backed_services/service'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'

interface Prop {
  plan: PlanFormacionModel
}

const props = defineProps<Prop>()

const versiones = usePaginateResponse<ArchivoModel>()
const paginate = ref(new Paginate())

async function loadData(paginate: Paginate) {
  try {
    const plan_id = props.plan?.id
    const response = await FIndivServices.list_versiones_plan_formacion(plan_id, paginate)
    versiones.value = response
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error)
  }
}

onMounted(() => {
  paginate.value.page = 1
  loadData(paginate.value)
})
</script>

<template>
<!--  <version-list :data="versiones.results" /> -->
</template>

<style scoped>

</style>
