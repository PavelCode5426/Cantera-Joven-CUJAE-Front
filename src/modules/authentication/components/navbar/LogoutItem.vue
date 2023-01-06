<script setup lang="ts">
import AuthServices from '../../../../backed_services/authentication.services'
import { activateLoading, desactivateLoading } from '../../../../globals/composables/useLoading'
import AuthStore, { initialState as authStoreInitialState } from '@/modules/authentication/store/auth.store'

const isLoading = ref(false)
const authStore = AuthStore()
const router = useRouter()

async function logout() {
  activateLoading(isLoading)
  const response = await AuthServices.logout()
  authStore.$patch({ isAuthenticated: false, token: undefined, user: undefined })
  desactivateLoading(isLoading)
  router.push({ name: 'login-page' })
}
</script>

<template>
  <li class="sep" />
  <li @click="logout">
    <a class="cursor-pointer">
      Cerrar Sesion
      <Loading v-if="isLoading" />
      <i v-else class="entypo-logout right" />
    </a>
  </li>
</template>
