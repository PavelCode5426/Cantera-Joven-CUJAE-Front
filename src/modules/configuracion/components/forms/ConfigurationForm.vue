<script setup lang="ts">
import ConfigurationService from '~/services/configuration.services'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import { ConfigHelper } from '~/modules/configuracion/helpers/config.helpers'
import { ServerError } from '~/globals/config/axios'
import { newArrayRef, registerArrayRefs } from '~/globals/composables/useRegisterArrayRef'

const configs = ref([])
const configurationValueRefs = newArrayRef()

async function loadConfigurations() {
  const confs = await ConfigurationService.listConfigs()
  checkServerErrorAndRedirect(confs) && checkIsAuthenticateAndRedirect(confs)
  configs.value = ConfigHelper.fromConfigModel(confs.data)
}

async function canSaveConfigurationVars() {
  let is = true
  const configRef = configurationValueRefs.value
  for (const item of configRef) {
    const canItem = await item.canSaveConfigurationVar()
    is = is && canItem
  }
  return is
}
async function saveConfigurationVars(): boolean {
  const responses = []
  const configRef = configurationValueRefs.value
  for (const item of configRef)
    responses.push(await item.saveConfigurationVar())

  const hasError = responses.find(item => item instanceof ServerError || item === undefined) as boolean
  return !hasError
}
async function submitForm() {
  const is: boolean = await canSaveConfigurationVars()
  if (is) {
    const is = await saveConfigurationVars()
    ElMessage.success('Configuracion Guardada Correctamente')
  }
  else { ElMessage.error('Formulario Incompleto') }
}

loadConfigurations()
</script>

<template>
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
    button-title="Guardar Cambios"
    button-icon="fa fa-save"
    button-type="btn-primary"
    data-test="submit-config"
    dialog-message="¿Esta seguro de aplicar la configuracion actual al sistema?"
    @on-confirm="submitForm()"
  />
</template>
