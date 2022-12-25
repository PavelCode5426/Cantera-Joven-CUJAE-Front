<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ElNotification } from 'element-plus'
import { checkServerErrorAndMessage, isExceptionResponse } from '../../../../helpers/utils'
import AuthServices from '@/backed_services/authentication.services'
import AuthStore, {} from '@/modules/authentication/store/auth.store'
import { ExceptionResponse, ServerError } from '@/globals/config/axios'

const router = useRouter()
const authStore = AuthStore()
const username = ref('')
const password = ref('')
const isLoadingForm = ref(false)
const error_auth = ref(false)

const validations = computed(() => ({
  username: { required },
  password: { required },
}))
const v = useVuelidate(validations, { username, password }).value

const submitLoginForm = async () => {
  const isFormCorrect = await v.$validate()
  if (isFormCorrect) {
    isLoadingForm.value = true
    try {
      const response = await AuthServices.login(username.value, password.value)

      authStore.$patch({ isAuthenticated: true, token: response.token, user: response.user })
      router.push({ path: 'admin' })
    }
    catch (error: ExceptionResponse | ServerError) {
      if (isExceptionResponse(error)) {
        switch (error.httpCode) {
          case 400: {
            ElNotification.error({ showClose: true, message: 'Credenciales Incorrectos' })
            break
          }
          default:{
            ElNotification.error({ showClose: true, message: error.detail })
          }
        }
      }
      password.value = ''
      checkServerErrorAndMessage(error)
    }
    v.$reset()
  }

  isLoadingForm.value = false
}
</script>

<template>
  <div class="login-content">
    <div id="form_login">
      <div class="form-group">
        <el-input v-model="username" placeholder="Nombre de Usuario" name="username" />
        <error-help-block :items="v.username.$errors" />
      </div>
      <div class="form-group">
        <el-input v-model="password" type="password" planceholder="Contraseña" name="password" show-password />
        <error-help-block :items="v.password.$errors" />
      </div>

      <div class="form-group">
        <button class="btn btn-primary btn-block btn-login" @click="submitLoginForm">
          <Loading v-if="isLoadingForm" />
          <i v-else class="entypo-login" />
          Login In
        </button>
      </div>
    </div>
  </div>
</template>
