<script setup lang="ts">
import { ref, watch } from 'vue'
import { required, requiredIf } from '@vuelidate/validators'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import useVuelidate from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import gestionarAreaServices, { AprobarPreubicacionArea } from '../../../../../backed_services/gestionar_area.services'
import type UbicacionLaboralModel from '../../../../../backed_services/models/ubicacion_laboral.model'
import { ExceptionResponse } from '~/globals/config/axios'
import defaulDialogFormProps from '@/globals/composables/useDialogForm'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '@/helpers/utils'
import loading, { activateLoading, desactivateLoading } from '@/globals/composables/useLoading'

interface Props {
  preubicacion: UbicacionLaboralModel
}
const props = defineProps<Props>()
const emit = defineEmits(['aprobada', 'rechazada'])
const showModal = ref(false)

const form = ref({
  mensaje: undefined,
  aceptada: undefined,
})
const validationsRules = {
  mensaje: { required },
  aceptada: { required },
}

const $v = useVuelidate(validationsRules, form)
const v = $v.value

function clearForm() {
  form.value = {
    mensaje: undefined,
    aceptada: undefined,
  }
  v.$reset()
}

async function submitForm() {
  const valid = await v.$validate()
  if (valid) {
    try {
      const params = form.value
      if (params.aceptada) {
        const response = await gestionarAreaServices.aprobar_ubicacion_laboral(new AprobarPreubicacionArea(params.mensaje, params.aceptada))
        props.preubicacion.esPreubicacion = true
        ElNotification.success('Preubicación Laboral aprobada')
        emit('aprobada')
      }
      else {
        const response = await gestionarAreaServices.aprobar_ubicacion_laboral(new AprobarPreubicacionArea(params.mensaje, params.aceptada))
        ElNotification.success('Preubicación Laboral rechazada')
        emit('rechazada')
      }
      showModal.value = false
    }
    catch (error: ServerError | ExceptionResponse) {
      alert(error)
      alert(error.httpCode)
    }
  }
}
watch(showModal, (newValue) => {
  if (!newValue)
    clearForm()
})
</script>

<template>
  <el-dialog v-model="showModal" title="Revisar Preubicación Laboral">
    <el-form>
      <el-form-item label="Aprobar asignación:">
        <el-select v-model="form.aceptada">
          <el-option :value="true" label="Aceptar preubicación" />
          <el-option :value="false" label="Rechazar preubicación" />
        </el-select>
        <input-error-message :items="$v.aceptada.$errors"/>
      </el-form-item>>
      <el-form-item label="Comentarios:">
        <el-input v-model="form.mensaje" type="textarea" />
      </el-form-item>
    </el-form>
    <el-row justify="end">
      <el-button @click="submitForm">
        Aceptar
      </el-button>
      <el-button @click="showModal = false">
        Cancelar
      </el-button>
    </el-row>
  </el-dialog>
</template>
