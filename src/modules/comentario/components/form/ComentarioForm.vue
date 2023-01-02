<script lang="ts" setup>
import { defineEmits, ref } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import type ComentarioModel from '../../../../backed_services/models/comentario.model'
import AuthStore from '../../../authentication/store/auth.store'

const emit = defineEmits(['new'])
const authStore = AuthStore()

const form = ref({
  text: '',
})

const formValidation = {
  text: { required },
}

const $v = useVuelidate(formValidation, form)
const v = $v.value

async function submitForm() {
  const valid = await v.$validate()
  if (valid) {
    const comentario = {
      texto: form.value.text,
      fecha: Date.now(),
      usuario: authStore?.user,
    } as ComentarioModel
    emit('new', comentario)
    clearForm()
  }
}

function clearForm() {
  form.value.text = ''
  v.$reset()
}

clearForm()
</script>

<template>
  <el-row justify="end">
    <el-form-item>
      <editor v-model="form.text" style="width: 100%" @blur="$v.text.$touch()" />
      <input-error-message :items="$v.text.$errors" />
    </el-form-item>
  </el-row>
  <el-row justify="end">
    <el-button @click="submitForm">
      Comentar
    </el-button>
  </el-row>
</template>
