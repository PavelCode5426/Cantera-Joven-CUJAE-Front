<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { EtapaFormacionModel, PlanFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import formacionIndividualStore from '../../store/planificacion_individual.store'

interface Prop {
  etapa: EtapaFormacionModel
  plan: PlanFormacionModel
}
const props = defineProps<Prop>()
const showModal = ref(false)

const formacionStore = formacionIndividualStore()

const buttonText = computed(() => {
  if (props.plan)
    return 'Evaluar Plan'
  else return 'Evaluar Etapa'
})
const dialogTitle = computed(() => {
  if (props.plan)
    return 'Evaluar Plan de Formacion'
  else return `Evaluar Etapa #${props.etapa?.numero}`
})

async function evaluacionFormacionSuccessHandler(evaluacion) {
  ElNotification.success('Evaluacion de etapa creada correctamente')
  showModal.value = false
  props.etapa.evaluacion = evaluacion
}
async function evaluacionFinalSuccessHandler(evaluacion) {
  ElNotification.success('Evaluacion del plan creada correctamente')
  showModal.value = false
  const p = props.plan
  if (p.evaluacion !== null && p.evaluacion.aprobadoPor !== null)
    p.evaluacion_prorroga = evaluacion
  else p.evaluacion = evaluacion
}

const hasExtras = computed(() => {
  return formacionStore.ultimaEtapa()?.id !== props.etapa.id
})
</script>

<template>
  <el-button @click="showModal = true">
    {{ buttonText }}
  </el-button>

  <el-dialog v-model="showModal" :title="dialogTitle">
    <evaluar-etapa-form v-if="etapa" :etapa="etapa" :has-extras="hasExtras" @success="evaluacionFormacionSuccessHandler" />
    <evaluar-plan-form v-else :plan="plan" @success="evaluacionFinalSuccessHandler" />
  </el-dialog>
</template>
