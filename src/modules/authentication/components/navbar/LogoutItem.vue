<template>
  <li class="sep"></li>
  <li @click="logout">
    <a class="cursor-pointer">
      Cerrar Sesion
      <Loading v-if="isLocalLoading"/>
      <i class="entypo-logout right" v-else/>
    </a>
  </li>
</template>
<script setup lang="ts">
import AuthenticationService from "@/services/auth.services"
import AuthStore,{initialState as authStoreInitialState} from "@/modules/authentication/store/auth.store"

const isLocalLoading = ref(false)
const authStore = AuthStore()
const router = useRouter()

async function logout() {
  isLocalLoading.value = true
  const response = await AuthenticationService.logout()
  authStore.setAttr(authStoreInitialState) //TODO SUSTITUIR POR ABAJO
  //authStore.$reset() //TODO ARREGLAR ESTO
  router.push({name:'login-page'})
}
</script>
