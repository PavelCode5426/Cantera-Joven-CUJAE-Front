<script setup lang="ts">
import { minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ref } from 'vue'
import { ExceptionResponse } from '~/globals/config/axios'
import defaulDialogFormProps from '@/globals/composables/useDialogForm'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '@/helpers/utils'
import loading, { activateLoading, desactivateLoading } from '@/globals/composables/useLoading'
import UbicacionLaboralModel from "../../../../../backed_services/models/ubicacion_laboral.model";
import gestionarAreaServices from "../../../../../backed_services/gestionar_area.services";

interface DialogFormProp {
  dialogVisible: boolean | undefined
}
withDefaults(defineProps<DialogFormProp>(), {
  ...defaulDialogFormProps,
})

const emit = defineEmits(['on-success-create'])

const isLoading = ref(false)
const form = ref({
  aprobar: false,
  mensaje: '',
})
const validationsRules = {
  mensaje: { required },
}
const $v = useVuelidate(validationsRules, form)
const v = $v.value

const close: Function | undefined = inject('closeCreateDialog')

async function submitForm() {
  activateLoading(isLoading)
  const isValid = await v.$validate()

  if (isValid) {
    try {
      const model: UbicacionLaboralModel = { ...form.value } as UbicacionLaboralModel
      const response = await gestionarAreaServices.aprobar_ubicacion_laboral(false, '')
      closeDialog()
      emit('on-success-create')
    }
    catch (error: ServerError | ExceptionResponse) {
      checkServerErrorAndRedirect(error)
      checkIsAuthenticateAndRedirect(error)
    }
  }

  desactivateLoading(isLoading)
}
function clearForm() {
  form.value = { aprobar: false, mensaje: '' }
  v.$reset()
}
function closeDialog() {
  clearForm()
  close()
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="Revisar asignación" :closed="clearForm" :show-close="false">
    <el-form>
      <el-form-item label="Aprobar asignación de posibles graduados:">
        <el-switch v-model="form.aprobar" />
      </el-form-item>
      <el-form-item label="Comentarios:">
        <el-input v-model="form.mensaje" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="modal-footer">
        <button class="btn btn-info" @click="submitForm">
          <loading v-if="isLoading" />
          Aceptar
        </button>
        <button class="btn btn-default" @click="closeDialog">
          Cerrar
        </button>
      </div>
    </template>
  </el-dialog>
</template>
