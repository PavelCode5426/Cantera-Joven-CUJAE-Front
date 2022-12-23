<script setup lang="ts">
import AuthServices from '../../../../backed_services/authentication.services'
import AuthStore, { initialState as authStoreInitialState } from '@/modules/authentication/store/auth.store'

const isLoading = ref(false)
const authStore = AuthStore()
const router = useRouter()

async function logout() {
  isLocalLoading.value = true
  const response = await AuthServices.logout()
  authStore.$patch({ isAuthenticated: false, token: undefined, user: undefined })
  router.push({ name: 'login-page' })
}
</script>

<template>
  <li class="sep" />
  <li @click="logout">
    <a class="cursor-pointer">
      Cerrar Sesion
      <Loading v-if="isLocalLoading" />
      <i v-else class="entypo-logout right" />
    </a>
  </li>
</template>
