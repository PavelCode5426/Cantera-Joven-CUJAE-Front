<script setup lang="ts">
import { computed, defineProps } from 'vue'
import useVuelidate from '@vuelidate/core'
import FColectivaServices from '../../../../../backed_services/formacion_colectiva.services'
import {
  EstadoPlanFormacionColectiva,
  EtapaFormacionColectivaModel
} from '../../../../../backed_services/models/formacion_colectiva.model'
import formacionColectivaStore from '../../store/planificacion_colectiva.store'

interface Props {
  etapa: EtapaFormacionColectivaModel
}

const props = defineProps<Props>()
const formacionStore = formacionColectivaStore()

const can_edit = computed(() => {
  const can = formacionStore?.plan?.estado === EstadoPlanFormacionColectiva.desarrollo
  return can
})
</script>

<template>
  <etapa-formacion-colectiva-edit-form v-if="can_edit" :etapa="etapa"/>
  <etapa-formacion-colectiva-detail v-else :etapa="etapa" />
</template>
