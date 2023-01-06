<script lang="ts" setup>
import { withDefaults } from 'vue-demi'
import { computed, defineProps } from 'vue'
import type {
  EvaluacionFinalModel,
  EvaluacionFormacionModel,
} from '../../../../../backed_services/models/formacion_individual.model'
import { get_current_id } from '../../../../../helpers/utils'

interface Prop {
  evaluacion: EvaluacionFormacionModel | EvaluacionFinalModel
  showDetails: boolean
}

const props = withDefaults(defineProps<Prop>(), {
  showDetails: false,
})

const criterios = computed(() => {
  const list: { type: string;text: string }[] = []
  const evaluacion = props.evaluacion

  if (evaluacion.esSatisfactorio)
    list.push({ type: 'success', text: 'Satisfactorio' })
  else
    list.push({ type: 'danger', text: 'No satisfactorio' })

  if (evaluacion.replanificar)
    list.push({ type: 'warning', text: 'Replanificar' })
  if (evaluacion.cerrarPlan)
    list.push({ type: 'warning', text: 'Cerrar Formacion' })

  return list
})
const linkTo = computed(() => {
  let plan_id = -1

  if (props.evaluacion.etapa)
    plan_id = props.evaluacion.etapa.plan
  else
    plan_id = props.evaluacion.plan.id

  return { name: 'plan-formacion-page', params: { id: plan_id } }
})
</script>

<template>
  <el-descriptions column="1" border>
    <el-descriptions-item label="Nombre y Apellidos">
      {{ props.evaluacion.joven.first_name }} {{ props.evaluacion.joven.last_name }}
    </el-descriptions-item>
    <el-descriptions-item label="Resumen de desempeño">
      {{ props.evaluacion.texto }}
    </el-descriptions-item>
    <el-descriptions-item label="Criterios">
      <el-tag v-for="criterio in criterios" :type="criterio.type">
        {{ criterio.text }}
      </el-tag>
    </el-descriptions-item>
    <el-descriptions-item v-if="props.evaluacion.propuestaMovimiento" label="Propuesta de Movimiento">
      {{ props.evaluacion.propuestaMovimiento.nombre }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.evaluacion.aprobadoPor" label="Aprobado por">
      {{ props.evaluacion.aprobadoPor.first_name }} {{ props.evaluacion.aprobadoPor.last_name }}
    </el-descriptions-item>
    <el-descriptions-item v-if="showDetails" label="Detalles">
      <router-link :to="linkTo">
        <el-button>Revisar Plan de Formacion</el-button>
      </router-link>
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>

</style>
