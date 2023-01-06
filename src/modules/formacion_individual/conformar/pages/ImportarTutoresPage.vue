<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import AuthStore from '../../../authentication/store/auth.store'
import ImportService from '../../../../backed_services/importar.services'
import { ExceptionResponse } from '../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import { Filter } from '../../../../backed_services/service'
import type { UserLDAPModel } from '~/backed_services/models/ldap.model'
import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'

const authStore = AuthStore()
const isLoading = ref(false)
let tutores_init: UserLDAPModel[] = []
const tutores = ref<UserLDAPModel[]>([])
const filter = ref<Filter>(new Filter())
const multipleSelection = ref<UserLDAPModel[]>([])

function handleSelectionChange(val: UserLDAPModel[]) {
  multipleSelection.value = val
}
async function importSingleElement(element) {
  try {
    await ImportService.import_tutores(authStore.user.area?.id, [element])
    tutores_init = tutores_init.filter(i => i.identification !== element.identification)
    tutores.value = tutores_init
    multipleSelection.value = []
    filter.value.search = ''
    ElNotification.success('Tutor importado correctamente')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function importManyElement(elements) {
  activateLoading(isLoading)
  try {
    await ImportService.import_tutores(authStore.user.area?.id, elements)
    tutores_init = tutores_init.filter(i => !elements.find(e => e.identification === i.identification))
    tutores.value = tutores_init
    multipleSelection.value = []
    filter.value.search = ''
    ElNotification.success('Tutores importados correctamente')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}
const searchElement = () => {
  const s = filter.value.search.toLowerCase()
  if (s === '') {
    tutores.value = tutores_init
  }
  else {
    tutores.value = tutores_init.filter(i =>
      i.name?.toLowerCase().startsWith(s)
        || i.lastname?.toLowerCase().startsWith(s)
        || i.identification?.toLowerCase().startsWith(s)
        || i.email?.toLowerCase().startsWith(s),
    )
  }
}

async function loadTutores() {
  try {
    const area = authStore.user.area?.id
    tutores_init = await ImportService.all_tutores(area)
    tutores.value = tutores_init
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

onMounted(loadTutores)
</script>

<template>
  <h3>Importar Tutores</h3>
  <el-row justify="space-between">
    <el-col :span="6">
      <filter-form v-model:filter="filter" @submit="searchElement" />
    </el-col>
    <el-col :span="7">
      <p-button :loading="isLoading" button-type="success" button-title="Importar seleccionados" button-icon="entypo-list-add" :disabled="!multipleSelection.length" @click="importManyElement(multipleSelection)" />
    </el-col>
  </el-row>

  <l-d-a-p-list max-height="500" :data="tutores" @import-item="importSingleElement" @selection-change="handleSelectionChange" />
</template>
