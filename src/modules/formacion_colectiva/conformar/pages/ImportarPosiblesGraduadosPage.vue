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
let pgraduados_init: UserLDAPModel[] = []
const pgraduados = ref<UserLDAPModel[]>([])
const filter = ref<Filter>(new Filter())
const multipleSelection = ref<UserLDAPModel[]>([])

function handleSelectionChange(val: UserLDAPModel[]) {
  multipleSelection.value = val
}
async function importSingleElement(element) {
  try {
    await ImportService.import_pgraduados([element])
    pgraduados_init = pgraduados_init.filter(i => i.identification !== element.identification)
    pgraduados.value = pgraduados_init
    multipleSelection.value = []
    filter.value.search = ''
    ElNotification.success('Posible graduado importado correctamente')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function importManyElement(elements) {
  activateLoading(isLoading)
  try {
    await ImportService.import_pgraduados(elements)
    pgraduados_init = pgraduados_init.filter(i => !elements.find(e => e.identification === i.identification))
    pgraduados.value = pgraduados_init
    multipleSelection.value = []
    filter.value.search = ''
    ElNotification.success('Posibles graduados importados correctamente')
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
    pgraduados.value = pgraduados_init
  }
  else {
    pgraduados.value = pgraduados_init.filter(i =>
      i.name?.toLowerCase().startsWith(s)
        || i.lastname?.toLowerCase().startsWith(s)
        || i.identification?.toLowerCase().startsWith(s)
        || i.email?.toLowerCase().startsWith(s),
    )
  }
}

async function loadPGraduados() {
  try {
    pgraduados_init = (await ImportService.all_pgraduados())
    pgraduados.value = pgraduados_init
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

onMounted(loadPGraduados)
</script>

<template>
  <h3>Importar Posibles Graduados</h3>
  <el-row justify="space-between">
    <el-col :span="6">
      <filter-form v-model:filter="filter" @submit="searchElement" />
    </el-col>
    <el-col :span="7">
      <button type="button" class="btn btn-primary uk-text-bold" :disabled="!multipleSelection.length" @click="importManyElement(multipleSelection)">
        <loading v-if="isLoading" /><i v-else class="entypo-list-add" /> Importar Seleccionados
      </button>
    </el-col>
  </el-row>

  <l-d-a-p-list max-height="500" :data="pgraduados" @import-item="importSingleElement" @selection-change="handleSelectionChange" />
</template>
