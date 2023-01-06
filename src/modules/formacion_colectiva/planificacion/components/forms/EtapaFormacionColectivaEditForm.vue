<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { minLength, minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import FColectivaServices from '../../../../../backed_services/formacion_colectiva.services'
import type { EtapaFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'

interface Props {
  etapa: EtapaFormacionColectivaModel
}

const props = defineProps<Props>()
const emit = defineEmits(['error', 'success'])

const form = ref({
  fechas: [props.etapa?.fechaInicio, props.etapa?.fechaFin],
})

const formValidations = {
  fechas: [{ required }, { required }],
}

const $v = useVuelidate(formValidations, form)
const v = $v.value

async function updateEtapa() {
  const valid = await v.$validate()
  if (valid) {
    const valid_form = form.value
    const etapa: EtapaFormacionColectivaModel = {
      id: props.etapa?.id,
      fechaInicio: valid_form.fechas[0],
      fechaFin: valid_form.fechas[1],
    }
    try {
      const response = await FColectivaServices.update_etapa(etapa.id, etapa)
      ElNotification.success('Etapa actualizada correctamente')
      emit('success')
    }
    catch (error) {
      ElNotification.error(error.detail)
    }
  }
}
</script>

<template>
  <el-form inline label-position="top">
    <el-form-item label="Fechas">
      <date-picker
        v-model="form.fechas" type="daterange" start-placeholder="Fecha de inicio"
        end-placeholder="Fecha de fin" range-separator="hasta" @blur="$v.fechas.$touch()"
      />
      <input-error-message :items="$v.fechas.$errors" />
    </el-form-item>
  </el-form>
  <el-button @click="updateEtapa">
    Actualizar Etapa
  </el-button>
</template>
