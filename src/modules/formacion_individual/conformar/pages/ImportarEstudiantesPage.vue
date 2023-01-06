<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
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
const filter = ref<Filter>(new Filter(0))
const multipleSelection = ref<EstudianteLDAPModel[]>([])

function handleSelectionChange(val: EstudianteLDAPModel[]) {
  multipleSelection.value = val
}
async function importSingleElement(element) {
  try {
    ImportService.import_estudiantes(authStore.user.area?.id, [element])
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
  activateLoading(isImportLoading)
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
  desactivateLoading(isImportLoading)
}
const searchElement = () => {
  const paginate = filter.value
  const s = filter.value.search.toLowerCase()
  if (s === '') {
    return estudiantes.value = estudiantes_init
  }
  else {
    return estudiantes.value = estudiantes_init.slice(paginate.page * paginate.page_size).filter(i =>
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
    const response = await ImportService.all_estudiantes(area)
    estudiantes_init = response
    estudiantes.value = response
    // changeCurrentPage()
    desactivateLoading(isTableLoading)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
    if (error.httpCode == 500)
      ElNotification.error('Error al conectar con el directorio')
  }
}

function submitFilter() {
  filter.value.page = 0
  changeCurrentPage()
}
function changeCurrentPage() {
  const paginate = filter.value
  const elements = searchElement().slice(paginate.page * paginate.page_size, (++paginate.page) * paginate.page_size)
  if (elements.length)
    estudiantes.value.push(...elements)
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
      <p-button :loading="isImportLoading" button-type="success" button-title="Importar seleccionados" button-icon="entypo-list-add" :disabled="!multipleSelection.length" @click="importManyElement(multipleSelection)" />
    </el-col>
  </el-row>

  <l-d-a-p-list :loading="isTableLoading" max-height="500" :data="estudiantes" @import-item="importSingleElement" @selection-change="handleSelectionChange" />
</template>
