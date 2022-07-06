<template>
  <div class="login-content">
    <div id="form_login">
      <div class="form-group">
        <el-input v-model="username" placeholder="Nombre de Usuario" />
        <error-help-block :items="v.username.$errors"/>
      </div>
      <div class="form-group">
        <el-input v-model="password" type="password" planceholder="Contraseña" show-password />
        <error-help-block :items="v.password.$errors"/>
      </div>

      <div class="form-group">
        <button @click="submitLoginForm" class="btn btn-primary btn-block btn-login" >
          <Loading v-if="isLoadingForm"/>
          <i class="entypo-login" v-else/>
          Login In
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import AuthServices from "@/services/auth.services";
import AuthStore,{initialState as authStoreInitialState} from "@/modules/authentication/store/auth.store";
import {ServerError} from "@/globals/config/axios";

const router = useRouter()
const $t = useI18n().t

const authStore = AuthStore()
const username = ref('')
const password = ref('')
const isLoadingForm = ref(false)
const error_auth = ref(false)

const validations = computed(() => ({
  username: { required },
  password: { required }
}))
const v = useVuelidate(validations, {username,password}).value

const submitLoginForm = async () => {
  const isFormCorrect = await v.$validate()
  if(isFormCorrect) {
    isLoadingForm.value = true
    const response = await AuthServices.login(username.value, password.value)

    if (response instanceof ServerError) {
      ElMessage.error($t(response.error.message))
      password.value = ''
    }
    else if (response.httpCode == 400) {
      password.value = ''
      console.log(authStoreInitialState)
      authStore.setAttr(authStoreInitialState) //TODO SUSTITUIR POR ABAJO
      //authStore.$reset() //TODO ARREGLAR ESTO
      ElMessage.error({showClose: true, message: "Credenciales Incorrectos"})
    } else {
      const data: any = {token: response.data.token, ...response.data.user}
      authStore.setAttr(data)
      router.push({path: 'admin'})
    }
    v.$reset()
  }
  isLoadingForm.value = false
}



</script>