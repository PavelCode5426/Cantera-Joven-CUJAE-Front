<script setup lang="ts">
import { minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ref } from 'vue'
import { ExceptionResponse } from '~/globals/config/axios'
import AKeyService from '~/backed_services/apikey.service'
import defaulDialogFormProps from '@/globals/composables/useDialogForm'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '@/helpers/utils'
import loading, { activateLoading, desactivateLoading } from '@/globals/composables/useLoading'
import type { ApikeyModel } from '~/backed_services/models/apikey.model'

interface DialogFormProp {
  dialogVisible: boolean | undefined
}
withDefaults(defineProps<DialogFormProp>(), {
  ...defaulDialogFormProps,
})

const emit = defineEmits(['on-success-create'])

const isLoading = ref(false)
const form = ref({
  name: '',
  expired_at: null,
})
const validationsRules = {
  name: { required },
}
const $v = useVuelidate(validationsRules, form)
const v = $v.value

async function submitForm() {
  activateLoading(isLoading)
  const isValid = await v.$validate()

  if (isValid) {
    try {
      const model: ApikeyModel = { ...form.value } as ApikeyModel
      const response = await AKeyService.create_apikey(model)
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
  form.value = { name: '', expired_at: null }
  v.$reset()
}
function closeDialog() {
  clearForm()
  close()
}
</script>

<template>
  <el-form>
    <el-form-item label="Nombre del Sistema">
      <el-input v-model="$v.name.$model" @blur="$v.name.$touch()" />
      <input-error-message :items="$v.name.$errors" />
    </el-form-item>
    <el-form-item label="Fecha de Expiracion">
      <date-picker v-model="form.expired_at" />
    </el-form-item>
  </el-form>
  <el-row justify="end">
    <p-button button-title="Aceptar" button-type="primary" :loading="isLoading" @click="submitForm" />
    <p-button button-title="Cancelar" @click="closeDialog" />
  </el-row>
</template>
