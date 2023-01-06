<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import vueVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import type { PosibleGraduadoModel } from '../../../../../backed_services/models/posible_graduado.model'
import type { EvaluacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'
import FColectivaServices from '../../../../../backed_services/formacion_colectiva.services'

interface Prop {
  posible_graduado: PosibleGraduadoModel
}

const prop = defineProps<Prop>()
const emit = defineEmits(['success', 'cancel'])

const form = ref({
  texto: prop.posible_graduado.evaluacion_fam?.texto,
  esSatisfactorio: prop.posible_graduado.evaluacion_fam?.esSatisfactorio,
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
    const evaluacion = { ...data } as EvaluacionColectivaModel

    const response: EvaluacionColectivaModel = await FColectivaServices.evaluar_joven(prop.posible_graduado.id, evaluacion)
    emit('success', response)
  }
}
</script>

<template>
  <el-form>
    <el-form-item label="Resumen de Asistencia a Actividades:">
      <el-select v-model="form.esSatisfactorio" @blur="$v.esSatisfactorio.$touch()">
        <el-option :value="true" label="Satisfactorio" />
        <el-option :value="false" label="No satisfactorio" />
      </el-select>
      <input-error-message :items="$v.esSatisfactorio.$errors" />
    </el-form-item>

    <el-form-item label="Comentarios:">
      <el-input v-model="form.texto" type="textarea" @blur="$v.texto.$touch()" />
      <input-error-message :items="$v.texto.$errors" />
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
