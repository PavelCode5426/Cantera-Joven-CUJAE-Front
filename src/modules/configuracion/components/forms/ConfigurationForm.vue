<template>
  <el-row>
    <configuration-variable v-for="(config,index) in configs"
                            :key="index"
                            :title="config.title"
                            :ref="registerArrayRefs(configurationValueRefs)"
                            :config="config.config"/>
  </el-row>
  <confirm-dialog-button buttonTitle="Guardar Cambios"
                         buttonIcon="fa fa-save"
                         buttonType="btn-primary"
                         @on-confirm="submitForm()"
                         dialogMessage="¿Esta seguro de aplicar la configuracion actual al sistema?"/>
</template>

<script setup lang="ts">

import ConfigurationService from "~/services/configuration.services"
import {checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect} from "~/helpers/utils"
import {ConfigHelper} from "~/modules/configuracion/helpers/config.helpers";
import {ServerError} from "~/globals/config/axios"
import {registerArrayRefs,newArrayRef} from "~/globals/composables/useRegisterArrayRef";

let configs = ref([])
const configurationValueRefs = newArrayRef()

async function loadConfigurations() {
  const  confs = await ConfigurationService.listConfigs()
  checkServerErrorAndRedirect(confs) && checkIsAuthenticateAndRedirect(confs)
  configs.value = ConfigHelper.fromConfigModel(confs.data)
}

async function canSaveConfigurationVars(){
  let is = true
  const configRef = configurationValueRefs.value
  for (const item of configRef){
    const canItem = await item.canSaveConfigurationVar()
    is = is && canItem
  }
  return is
}
async function saveConfigurationVars():boolean{
  const responses = new Array()
  const configRef = configurationValueRefs.value
  for (const item of configRef)
    responses.push(await item.saveConfigurationVar())

  let hasError = responses.find(item => item instanceof ServerError || item === undefined) as boolean
  return !hasError
}
async function submitForm(){
  const is:boolean = await canSaveConfigurationVars()
  if (is) {
    const is = await saveConfigurationVars()
    ElMessage.success("Configuracion Guardada Correctamente")
  }
  else ElMessage.error("Formulario Incompleto")

}


loadConfigurations()
</script>