<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import type { ActividadFormacionModel, EtapaFormacionModel } from '~/backed_services/models/formacion_individual.model'

interface Props {
  actividad: ActividadFormacionModel
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()
const emit = defineEmits(['cancel', 'success'])

const form = ref<ActividadFormacionModel>({
  nombre: props.actividad?.nombre,
  descripcion: props.actividad?.descripcion,
  observacion: props.actividad?.observacion,
  responsable: props.actividad?.descripcion,
  participantes: props.actividad?.participantes,
  fechaInicio: props.actividad?.fechaInicio,
  fechaFin: props.actividad?.fechaFin,
})
const formValidation = {
  nombre: { required },
  descripcion: { required },
  responsable: { required },
  fechaInicio: { required },
  fechaFin: { required },
}
const $v = useVuelidate(formValidation, form)
const v = $v.value

function clearForm() {
  form.value = {
    nombre: props.actividad?.nombre,
    descripcion: props.actividad?.descripcion,
    responsable: props.actividad?.descripcion,
    participantes: props.actividad?.participantes,
    fechaInicio: props.actividad?.fechaInicio,
    fechaFin: props.actividad?.fechaFin,
  }
  v.$reset()
}
async function submitForm() {
  const valid = await v.$validate()
  if (valid && props.actividad)
    await editActividad()
  else if (valid && props.actividad === undefined)
    await createActividad()
}

async function createActividad() {
  const actividad: ActividadFormacionModel = { ...form.value }
  try {
    await FIndivServices.create_actividad_formacion(props.etapa.id, actividad)
    emit('success', actividad)
  }
  catch (error: ServerError | ExceptionResponse) {
    alert(error)
    ElNotification.error(error.httpCode)
  }
}
async function editActividad() {
  const actividad: ActividadFormacionModel = { ...form.value }
  try {
    await FIndivServices.update_actividad_formacion(props.actividad.id, actividad)
    emit('success', actividad)
  }
  catch (error: ServerError | ExceptionResponse) {
    alert(error)
    alert(error.httpCode)
    ElNotification.error(error.httpCode)
  }
}

watch(props, () => {
  clearForm()
})
</script>

<template>
  <el-form>
    <el-form-item label="Nombre">
      <el-input v-model="form.nombre" @blur="$v.nombre.$touch()" />
      <input-error-message :items="$v.nombre.$errors" />
    </el-form-item>
    <el-form-item label="Responsable">
      <el-input v-model="form.responsable" @blur="$v.responsable.$touch()" />
    </el-form-item>
    <el-form-item label="Participantes">
      <el-input v-model="form.participantes" @blur="$v.participantes.$touch()" />
    </el-form-item>
    <el-form-item label="Fecha de Inicio">
      <el-date-picker v-model="form.fechaInicio" @blur="$v.fechaInicio.$touch()" />
    </el-form-item>
    <el-form-item label="Fecha de Fin">
      <el-date-picker v-model="form.fechaFin" @blur="$v.fechaFin.$touch()" />
    </el-form-item>
    <el-form-item label="Descripcion">
      <el-input v-model="form.descripcion" type="textarea" @blur="$v.descripcion.$touch()" />
    </el-form-item>
    <el-form-item label="Observacion">
      <el-input v-model="form.observacion" type="textarea" @blur="$v.observacion.$touch()" />
    </el-form-item>
    <gestor-archivos-actividad-formacion v-if="actividad" :actividad="actividad" />
    <el-form-item>
      <el-button @click="submitForm">
        Aceptar
      </el-button>
      <el-button @click="emit('cancel')">
        Cancelar
      </el-button>
    </el-form-item>
  </el-form>
</template>
