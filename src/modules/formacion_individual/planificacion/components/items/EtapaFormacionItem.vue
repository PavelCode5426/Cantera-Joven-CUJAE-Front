<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import type { EtapaFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import EtapaFormacionDetail from '../details/EtapaFormacionDetail.vue'
import formacionIndividualStore from '../../store/planificacion_individual.store'

interface Props {
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()
const formacionStore = formacionIndividualStore()

const can_edit = computed(() => {
  const can = props.etapa.evaluacion === null && formacionStore?.plan?.estado === EstadoPlanFormacion.desarrollo
  return can
})
</script>

<template>
  <etapa-formacion-edit-form v-if="can_edit" :etapa="etapa" :dimensiones="formacionStore.dimensiones" />
  <etapa-formacion-detail v-else :etapa="etapa" />
</template>
