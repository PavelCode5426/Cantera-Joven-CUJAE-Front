<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FColectivaServices from '../../../../../backed_services/formacion_colectiva.services'
import type { ActividadFormacionColectivaModel, EtapaFormacionModel } from '../../../../../backed_services/models/formacion_colectiva.model'

interface Props {
  actividad: ActividadFormacionColectivaModel
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()
const emit = defineEmits(['cancel', 'success'])

const form = ref({
  nombre: props.actividad?.nombre,
  descripcion: props.actividad?.descripcion,
  observacion: props.actividad?.observacion,
  responsable: props.actividad?.descripcion,
  participantes: props.actividad?.participantes,
  fechas: [props.actividad?.fechaInicio, props.actividad?.fechaFin],
})
const formValidation = {
  nombre: { required },
  descripcion: { required },
  responsable: { required },
  fechas: [{ required }, { required }],
}
const $v = useVuelidate(formValidation, form)
const v = $v.value

function clearForm() {
  form.value = {
    nombre: props.actividad?.nombre,
    descripcion: props.actividad?.descripcion,
    responsable: props.actividad?.descripcion,
    observacion: props.actividad?.observacion,
    participantes: props.actividad?.participantes,
    fechas: [props.actividad?.fechaInicio, props.actividad?.fechaFin],

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
  const actividad: ActividadFormacionColectivaModel = { ...form.value, fechaInicio: form.value.fechas[0], fechaFin: form.value.fechas[1] }
  try {
    await FColectivaServices.create_actividad_general(props.etapa.id, actividad)
    emit('success', actividad)
  }
  catch (error: ServerError | ExceptionResponse) {
    alert(error)
    ElNotification.error(error.httpCode)
  }
}
async function editActividad() {
  const actividad: ActividadFormacionColectivaModel = { ...form.value, fechaInicio: form.value.fechas[0], fechaFin: form.value.fechas[1] }
  try {
    await FColectivaServices.update_actividad_general(props.actividad.id, actividad)
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
      <input-error-message :items="$v.responsable.$errors" />
    </el-form-item>
    <el-form-item label="Participantes">
      <el-input v-model="form.participantes" />
    </el-form-item>
    <el-form-item label="Fechas">
      <date-picker
        v-model="form.fechas"
        type="daterange" start-placeholder="Fecha de inicio"
        end-placeholder="Fecha de entrega" range-separator="hasta" @blur="$v.fechas.$touch()"
      />
      <input-error-message :items="$v.fechas.$errors" />
    </el-form-item>
    <el-form-item label="Descripcion">
      <el-input v-model="form.descripcion" type="textarea" @blur="$v.descripcion.$touch()" />
      <input-error-message :items="$v.descripcion.$errors" />
    </el-form-item>
    <el-form-item label="Observacion">
      <el-input v-model="form.observacion" type="textarea" />
    </el-form-item>
    <gestor-archivos-actividad-formacion v-if="actividad" :actividad="actividad" />
    <el-row justify="end">
      <el-button @click="submitForm">
        Aceptar
      </el-button>
      <el-button @click="emit('cancel')">
        Cancelar
      </el-button>
    </el-row>
  </el-form>
</template>
