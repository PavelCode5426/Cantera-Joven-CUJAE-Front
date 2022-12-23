<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AuthStore from '../../../authentication/store/auth.store'
import ImportService from '../../../../backed_services/importar.services'
import { ExceptionResponse } from '../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import type { EstudianteLDAPModel } from '~/backed_services/models/ldap.model'
import loading from '~/globals/composables/useLoading'

const authStore = AuthStore()
const isLoading = loading(false)
const estudiantes = ref<EstudianteLDAPModel[]>([])

async function loadEstudiantes() {
  try {
    const area = authStore.user.area?.id
    estudiantes.value = await ImportService.all_estudiantes(area)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

onMounted(loadEstudiantes)
</script>

<template>
  <h3>Importar Estudiantes</h3>
  <el-row>
    <el-col :offset="18">
      <button type="button" class="btn btn-primary uk-text-bold">
        <loading v-if="isLoading" /><i v-else class="entypo-list-add" /> Importar Seleccionados
      </button>
    </el-col>
  </el-row>
  <estudiantes-l-d-a-p-list :data="estudiantes" />
</template>
