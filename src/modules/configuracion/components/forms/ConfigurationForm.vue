<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import type { ConfigurationModel } from '~/backed_services/models/configuration.model'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import { ConfigHelper } from '~/modules/configuracion/helpers/config.helpers'
import { ExceptionResponse, ServerError } from '~/globals/config/axios'
import { clearArrayRefs, newArrayRef, registerArrayRefs } from '~/globals/composables/useRegisterArrayRef'
import ConfigService from '~/backed_services/configuration.services'
import useLoading, { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'

const configs = ref<ConfigHelper[]>([])
const configurationValueRefs = newArrayRef()
const isLoading = useLoading()
const isSubmitLoading = useLoading(false)

async function loadConfigurations() {
  try {
    activateLoading(isLoading)
    const configurations: ConfigurationModel[] = await ConfigService.all_configs()
    configs.value = ConfigHelper.fromConfigModel(configurations)
    desactivateLoading(isLoading)
  }
  catch (error: ExceptionResponse | ServerError) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

async function canSaveConfigurationVars() {
  let is = true
  const configRef = configurationValueRefs.value
  // TODO OPTIMIZAR LA BUSQUEDA DEL FALSO
  for (const item of configRef) {
    const canItem = await item.canSaveConfigurationVar()
    is = is && canItem
  }
  return is
}
async function saveConfigurationVars(): boolean {
  const responses = []
  let hasError = false
  const configRef = configurationValueRefs.value
  try {
    for (const item of configRef)
      await item.saveConfigurationVar()
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
    hasError = true
  }

  return !hasError
}
async function submitForm() {
  activateLoading(isSubmitLoading)
  const is: boolean = await canSaveConfigurationVars()
  if (is) {
    const is = await saveConfigurationVars()
    ElMessage.success('Configuracion Guardada Correctamente')
  }
  else { ElMessage.error('Formulario Incompleto') }
  desactivateLoading(isSubmitLoading)
}

watch(isLoading, (newValue, oldValue) => {
  clearArrayRefs(configurationValueRefs)
})

loadConfigurations()
</script>

<template>
  <el-loading :body="isLoading" />
  <template v-if="!isLoading">
    <el-row>
      <configuration-variable
        v-for="(config, index) in configs"
        :key="index"
        :ref="registerArrayRefs(configurationValueRefs)"
        :title="config.title"
        :config="config.config"
      />
    </el-row>
    <confirm-dialog-button
      :loading="isSubmitLoading"
      button-title="Guardar Cambios"
      button-icon="fa fa-save"
      button-type="btn-primary"
      data-test="submit-config"
      dialog-message="¿Esta seguro de aplicar la configuracion actual al sistema?"
      @on-confirm="submitForm()"
    />
  </template>
</template>
