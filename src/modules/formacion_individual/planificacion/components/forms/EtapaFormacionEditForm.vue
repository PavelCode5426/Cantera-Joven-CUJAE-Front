<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { minLength, minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import type { DimensionModel, EtapaFormacionModel } from '~/backed_services/models/formacion_individual.model'

interface Props {
  etapa: EtapaFormacionModel
  dimensiones: DimensionModel[]
}

const props = defineProps<Props>()
const emit = defineEmits(['error', 'success'])

const form = ref({
  objetivo: props.etapa?.objetivo,
  fechas: [props.etapa?.fechaInicio, props.etapa?.fechaFin],
  dimesion: props.etapa?.dimension !== null ? props.etapa.dimension.id : undefined,
})

const formValidations = {
  objetivo: { required, minLength: minLength(15) },
  dimesion: { required },
  fechas: [{ required }, { required }],
}

const $v = useVuelidate(formValidations, form)
const v = $v.value

async function updateEtapa() {
  const valid = await v.$validate()
  if (valid) {
    const valid_form = form.value
    const etapa: EtapaFormacionModel = {
      id: props.etapa?.id,
      objetivo: valid_form.objetivo,
      fechaInicio: valid_form.fechas[0],
      fechaFin: valid_form.fechas[1],
      dimension: valid_form.dimesion,
    }
    try {
      const response = await FIndivServices.update_etapa_formacion(etapa.id, etapa)
      ElNotification.success('Etapa actualizada correctamente')
      emit('success', response)
    }
    catch (error) {
      ElNotification.error(error.detail)
    }
  }
}
</script>

<template>
  <el-form inline label-position="top">
    <el-form-item label="Objetivo">
      <el-input v-model="form.objetivo" style="width: 300px" @blur="$v.objetivo.$touch()" />
      <input-error-message :items="$v.objetivo.$errors" />
    </el-form-item>
    <el-form-item label="Dimension">
      <el-select v-model="form.dimesion" style="width: 300px" @blur="$v.dimesion.$touch()">
        <el-option v-for="dimension in dimensiones" :value="dimension.id" :label="dimension.nombre" />
      </el-select>
      <input-error-message :items="$v.dimesion.$errors" />
    </el-form-item>
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
