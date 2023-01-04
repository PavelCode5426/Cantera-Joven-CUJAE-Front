<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import vueVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import type { EvaluacionFinalModel, EvaluacionFormacionModel, PlanFormacionModel, PropuestaMovimientoModel } from '../../../../../backed_services/models/formacion_individual.model'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'

interface Prop {
  plan: PlanFormacionModel
}

const props = defineProps<Prop>()
const emit = defineEmits(['success', 'cancel'])

const es_prorroga = computed(() => {
  return props.plan.evaluacion !== null && props.plan.evaluacion.aprobadoPor !== null
})
const evaluacion = computed(() => {
  if (es_prorroga.value)
    return props.plan.evaluacion_prorroga
  return props.plan.evaluacion
})

const propuestasMovimiento = ref<PropuestaMovimientoModel[]>([])
const form = ref({
  texto: evaluacion.value?.texto,
  esSatisfactorio: evaluacion.value?.esSatisfactorio,
  propuestaMovimiento: evaluacion.value?.propuestaMovimiento?.id,
})
const formValidation = {
  texto: { required },
  esSatisfactorio: { required },
  propuestaMovimiento: { required },
}
const $v = vueVuelidate(formValidation, form)
const v = $v.value

const propuestas = computed(() => {
  if (es_prorroga.value)
    return propuestasMovimiento.value.filter(i => !i.nombre.toLowerCase().startsWith('prorroga'))
  return propuestasMovimiento.value
})

async function submitForm() {
  const valid = v.$validate()
  if (valid) {
    const data = form.value
    const evaluacion = { ...data } as EvaluacionFinalModel

    const response: EvaluacionFinalModel = await FIndivServices.evaluar_plan_individual(props.plan.id, evaluacion)
    emit('success', response)
  }
}
async function loadData() {
  propuestasMovimiento.value = await FIndivServices.all_propuestas_movimiento()
}

loadData()
</script>

<template>
  <el-form>
    <el-form-item label="Resumen de Desempeño">
      <el-select v-model="form.esSatisfactorio" @blur="$v.esSatisfactorio.$touch()">
        <el-option :value="true" label="Satisfactorio" />
        <el-option :value="false" label="No satisfactorio" />
      </el-select>
      <input-error-message :items="$v.esSatisfactorio.$errors" />
    </el-form-item>

    <el-form-item label="Nivel de Cumplimiento">
      <el-input v-model="form.texto" type="textarea" @blur="$v.texto.$touch()" />
      <input-error-message :items="$v.texto.$errors" />
    </el-form-item>

    <el-form-item label="Propuesta de Movimiento">
      <el-select v-model="form.propuestaMovimiento" @blur="$v.propuestaMovimiento.$touch()">
        <el-option v-for="propuesta in propuestas" :value="propuesta.id" :label="propuesta.nombre" />
      </el-select>
      <input-error-message :items="$v.propuestaMovimiento.$errors" />
    </el-form-item>

    <el-row justify="end">
      <el-button @click="submitForm">
        Evaluar
      </el-button>
      <el-button @click="emit('cancel')">
        Cancelar
      </el-button>
    </el-row>
  </el-form>
</template>
