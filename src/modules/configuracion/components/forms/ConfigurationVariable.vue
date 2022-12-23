<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import type { ConfigurationModel } from '~/backed_services/models/configuration.model'
import ConfigService from '~/backed_services/configuration.services'

interface Props {
  config: ConfigurationModel
  title: string
}
const props = defineProps<Props>()

const configValueMapper = {
  boolean: 'el-switch',
  number: 'el-input-number',
}
const valueComponent = configValueMapper[typeof props.config.valor]

const formConfig = ref({
  valor: props.config.valor,
  label: props.config.etiqueta,
  validation: props.config.validacion,
})
const validationsRules = {
  valor: { required },
}
const v = useVuelidate(validationsRules, formConfig)

async function saveConfigurationVar(): void {
  const is = await v.value.$validate() && v.value.valor.$dirty
  if (is) {
    const config = { id: props.config.id, valor: formConfig.value.valor } as ConfigurationModel
    await ConfigService.update_variable(config.id, config)
  }
}
async function canSaveConfigurationVar() {
  const anyDirty = v.value.valor.$dirty
  return !anyDirty || (await v.value.$validate() && anyDirty)
}

defineExpose({ saveConfigurationVar, canSaveConfigurationVar })
</script>

<template>
  <el-col :span="8">
    <el-form-item :label="title">
      <component
        :is="valueComponent"
        v-model="v.valor.$model"
        :min="formConfig.validation?.min"
        :max="formConfig.validation?.max"
        @blur="v.valor.$touch()"
        @change="v.valor.$touch()"
      />
      <error-help-block :items="v.valor.$errors" />
    </el-form-item>
  </el-col>
</template>
