<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import AuthStore from '../../../authentication/store/auth.store'
import ImportService from '../../../../backed_services/importar.services'
import { ExceptionResponse } from '../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../helpers/utils'
import { Filter } from '../../../../backed_services/service'
import type { EstudianteLDAPModel } from '~/backed_services/models/ldap.model'
import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'

const authStore = AuthStore()
const isImportLoading = ref(false)
const isTableLoading = ref(false)
let estudiantes_init: EstudianteLDAPModel[] = []
const estudiantes = ref<EstudianteLDAPModel[]>([])
const filter = ref<Filter>(new Filter())
const multipleSelection = ref<EstudianteLDAPModel[]>([])

function handleSelectionChange(val: EstudianteLDAPModel[]) {
  multipleSelection.value = val
}
async function importSingleElement(element) {
  try {
    await ImportService.import_estudiantes(authStore.user.area?.id, [element])
    estudiantes_init = estudiantes_init.filter(i => i.identification !== element.identification)
    estudiantes.value = estudiantes_init
    multipleSelection.value = []
    filter.value.search = ''
    ElNotification.success('Estudiante importado correctamente')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function importManyElement(elements) {
  activateLoading(isLoading)
  try {
    await ImportService.import_estudiantes(authStore.user.area?.id, elements)
    estudiantes_init = estudiantes_init.filter(i => !elements.find(e => e.identification === i.identification))
    estudiantes.value = estudiantes_init
    multipleSelection.value = []
    filter.value.search = ''
    ElNotification.success('Estudiantes importados correctamente')
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
    estudiantes.value = estudiantes_init
  }
  else {
    estudiantes.value = estudiantes_init.filter(i =>
      i.name?.toLowerCase().startsWith(s)
        || i.lastname?.toLowerCase().startsWith(s)
        || i.identification?.toLowerCase().startsWith(s)
        || i.email?.toLowerCase().startsWith(s),
    )
  }
}

async function loadEstudiantes() {
  try {
    activateLoading(isTableLoading)
    const area = authStore.user.area?.id
    estudiantes_init = (await ImportService.all_estudiantes(area))
    estudiantes.value = estudiantes_init
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isTableLoading)
}

onMounted(loadEstudiantes)
</script>

<template>
  <h3>Importar Estudiantes</h3>
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

  <l-d-a-p-list v-loading="isTableLoading" max-height="500" :data="estudiantes" @import-item="importSingleElement" @selection-change="handleSelectionChange" />
</template>
