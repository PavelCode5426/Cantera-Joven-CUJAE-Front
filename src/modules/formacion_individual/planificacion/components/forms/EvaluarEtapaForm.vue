<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import vueVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import type { EtapaFormacionModel, EvaluacionFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'

interface Prop {
  etapa: EtapaFormacionModel
  hasExtras: boolean
}

const props = withDefaults(defineProps<Prop>(), {
  hasExtras: true,
})
const emit = defineEmits(['success', 'cancel'])

const form = ref({
  texto: props.etapa.evaluacion?.texto,
  esSatisfactorio: props.etapa.evaluacion?.esSatisfactorio,
  replanificar: props.etapa.evaluacion?.replanificar,
  cerrarPlan: props.etapa.evaluacion?.cerrarPlan,
})
const formValidation = {
  texto: { required },
  esSatisfactorio: { required },
}

const $v = vueVuelidate(formValidation, form)
const v = $v.value

async function submitForm() {
  const valid = v.$validate()
  if (valid) {
    const data = form.value
    const evaluacion = { ...data } as EvaluacionFormacionModel

    const response: EvaluacionFormacionModel = await FIndivServices.evaluar_etapa_formacion(props.etapa.id, evaluacion)
    emit('success', response)
  }
}
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

    <el-form-item v-if="hasExtras">
      <el-checkbox v-model="form.replanificar" :disabled="form.cerrarPlan" label="Replanificar Plan Individual" />
      <el-checkbox v-model="form.cerrarPlan" :disabled="form.replanificar" label="Cerrar Plan Individual" />
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
