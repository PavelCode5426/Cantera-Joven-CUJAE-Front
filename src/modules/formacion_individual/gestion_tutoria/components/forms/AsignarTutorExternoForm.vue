<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
import { required, requiredIf } from '@vuelidate/validators'

import useVuelidate from '@vuelidate/core'
import { ElNotification } from 'element-plus'
import type { ExceptionResponse } from '../../../../../globals/config/axios'
import { ServerError } from '../../../../../globals/config/axios'
import {
  checkIsAuthenticateAndRedirect,
  checkServerErrorAndRedirect,
  isExceptionResponse,
} from '../../../../../helpers/utils'
import type { SolicitudTutorModel } from '../../../../../backed_services/models/tutorial.model'
import type UserModel from '../../../../../backed_services/models/user.model'
import { Filter } from '../../../../../backed_services/service'
import tutoriaServices from '../../../../../backed_services/tutoria.services'

interface Props {
  solicitud: SolicitudTutorModel | undefined
}

const props = defineProps<Props>()
const emit = defineEmits(['cancel', 'success'])

const tutoresArea = ref<UserModel[]>([])
const form = ref({
  selectedTutores: [],
  respuesta: undefined,
  motivo_respuesta: '',
})

const formValidations = {
  selectedTutores: { requiredIf: () => form.value.respuesta },
  respuesta: { required },
  motivo_respuesta: { required },
}

const $v = useVuelidate(formValidations, form)
const v = $v.value

async function loadTutores(area_id: number) {
  const all_tutors: UserModel[] = []
  try {
    const filter = new Filter(1, 500)
    let response = await tutoriaServices.all_tutors_in_area(area_id, filter)
    all_tutors.push(...response.results)

    while (response.next !== null) {
      all_tutors.push(...response.results)
      filter.page++
      response = await tutoriaServices.all_tutors_in_area(area_id, filter)
    }

    tutoresArea.value = all_tutors
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function clearForm() {
  form.value = {
    selectedTutores: [],
    respuesta: undefined,
    motivo_respuesta: '',
  }
  v.$reset()
}
async function submitForm() {
  const valid = await v.$validate()
  if (valid) {
    try {
      const data = form.value
      await tutoriaServices.responder_solicitud(props.solicitud.id, {
        tutores: data.selectedTutores,
        motivo_respuesta: data.motivo_respuesta,
      })
      ElNotification.success('Solicitud respondida correctamente')
      emit('success')
    }
    catch (error) {
      checkServerErrorAndRedirect(error)
      checkIsAuthenticateAndRedirect(error)

      if (isExceptionResponse(error) && error.httpCode === 400)
        ElNotification.error(error.detail)
    }
  }
}

watch(props, async (newProps) => {
  clearForm()
  await loadTutores(newProps.solicitud.area.id)
})

watch(form, (newValue) => {
  if (newValue.respuesta === false)
    newValue.selectedTutores = []
})

loadTutores(props.solicitud.area.id)
</script>

<template>
  <el-row justify="space-around">
    <el-col :span="10">
      <solicitud-tutor-details title="Informacion de la solicitud" column="1" :solicitud="solicitud" />
      <aval-accordion-details :joven="solicitud.joven" />
    </el-col>
    <el-col :span="10">
      <el-form v-model="form" label-position="top">
        <el-form-item label="Respuesta" required>
          <el-select v-model="form.respuesta" @blur="$v.respuesta.$touch()">
            <el-option :value="true" label="Aceptar solicitud" />
            <el-option :value="false" label="Rechazar solicitud" />
          </el-select>
        </el-form-item>
        <el-form-item label="Seleccionar tutores">
          <el-select v-model="form.selectedTutores" :disabled="form.respuesta === false || form.respuesta === undefined" multiple="true" filterable="true" @blur="$v.selectedTutores.$touch()">
            <el-option v-for="tutor in tutoresArea" :value="tutor.id" :label="`${tutor.first_name} ${tutor.last_name}`" />
          </el-select>
        </el-form-item>
        <el-form-item label="Motivo respuesta">
          <el-input v-model="form.motivo_respuesta" type="textarea" @blur="$v.motivo_respuesta.$touch()" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm">
            Aplicar
          </el-button>
          <el-button @click="emit('cancel')">
            Cancelar
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
