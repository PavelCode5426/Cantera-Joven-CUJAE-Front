<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { EstadoPlanFormacionColectiva } from '../../../../../backed_services/models/formacion_colectiva.model'
import type { EtapaFormacionModel } from '../../../../../backed_services/models/formacion_colectiva.model'
import EtapaFormacionDetail from '../details/EtapaFormacionDetail.vue'
import formacionColectivaStore from '../../store/planificacion_colectiva.store'

interface Props {
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()
const formacionStore = formacionColectivaStore()

const can_edit = computed(() => {
  const can = formacionStore?.plan?.estado === EstadoPlanFormacionColectiva.desarrollo
  return can
})
</script>

<template>
  <etapa-formacion-edit-form v-if="can_edit" :etapa="etapa"/>
  <etapa-formacion-detail v-else :etapa="etapa" />
</template>
