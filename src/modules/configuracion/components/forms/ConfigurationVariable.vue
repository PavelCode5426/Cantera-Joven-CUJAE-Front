<template>
  <el-col :span="8">
    <el-form-item :label="title">
      <component :is="valueComponent" v-model="formConfig.value" @blur="v.value.$touch()" @change="formConfig.hasChange=true"/>
      <error-help-block :items="v.value.$errors"/>
    </el-form-item>
  </el-col>
</template>

<script setup lang="ts">
import {ConfigurationModel} from "~/services/models/configuration.model"
import useVuelidate from "@vuelidate/core"
import {required} from "@vuelidate/validators"
import ConfigurationService from "~/services/configuration.services";
import {ServerError, ServerResponse} from "~/globals/config/axios";

interface Props{
  config:ConfigurationModel,
  title:string
}
const props = defineProps<Props>()

const configValueMapper = {
  boolean: 'el-switch',
  string: 'el-input',
  number: 'el-input-number'
}
const valueComponent = configValueMapper[typeof props.config.value]

const formConfig = ref({
  value:props.config.value,
  hasChange:false
})
const validationsRules = {
  value:{required}
}
const v = useVuelidate(validationsRules,formConfig).value

function hasChange(){
  return formConfig.value.hasChange
}
async function isValidConfigurationVar(){
  const is = await v.$validate()
  return is
}
async function saveConfigurationVar(): ServerResponse | ServerError | undefined {
  const is = await isValidConfigurationVar() && hasChange()
  let response = undefined
  if (is){
    const config = new ConfigurationModel(props.config.id,props.config.label,formConfig.value.value)
    response = await ConfigurationService.updateConfigValue(config)
  }
  return response
}
async function canSaveConfigurationVar(){
  return !hasChange() || (hasChange() && await isValidConfigurationVar())
}
defineExpose({saveConfigurationVar,canSaveConfigurationVar})


</script>