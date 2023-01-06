<script setup lang="ts">
import { computed, defineProps, onBeforeUpdate, ref, watch, withDefaults } from 'vue'
import { minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import AvalServices from '../../../../../backed_services/aval.services'
import loading, { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

interface Props {
  plantilla: PlantillaAvalModel | undefined
}
const props = withDefaults(defineProps<Props>(), { plantilla: undefined })

const emit = defineEmits(['cancel', 'success'])

const isLoading = loading(false)
const form = ref<PlantillaAvalModel>({
  id: props.plantilla?.id,
  texto: props.plantilla?.texto,
  nombre: props.plantilla?.nombre,
})

const validationsRules = {
  nombre: { required },
  texto: { required },
}
const $v = useVuelidate(validationsRules, form)
const v = $v.value

const PlantillaServices = AvalServices.PlantillaServices

async function submitForm() {
  const valid = await v.$validate()
  if (valid) {
    try {
      activateLoading(isLoading)
      const plantilla = form.value as PlantillaAvalModel
      if (plantilla.id)
        await PlantillaServices.edit_plantilla(plantilla.id, plantilla)
      else await PlantillaServices.create_plantilla(plantilla)

      emit('success')
      await clearForm()
    }
    catch (error: ServerError | ExceptionResponse) {
      checkServerErrorAndRedirect(error)
      checkIsAuthenticateAndRedirect(error)
    }
    desactivateLoading(isLoading)
  }
}
async function clearForm() {
  if (props.plantilla) {
    form.value = {
      id: props.plantilla?.id,
      texto: props.plantilla?.texto,
      nombre: props.plantilla?.nombre,
    }
  }
  else {
    form.value = {
      id: undefined,
      nombre: '',
      texto: '',
    }
  }
  v.$reset()
}

watch(props, clearForm)
</script>

<template>
  <el-form label-position="top">
    <el-form-item label="Nombre de la plantilla">
      <el-input v-model="form.nombre" @blur="$v.nombre.$touch()" />
      <input-error-message :items="$v.nombre.$errors" />
    </el-form-item>

    <el-form-item label="Contenido de la Plantilla">
      <editor v-model="form.texto" @update:content="form.texto = $event" @blur="$v.texto.$touch()" />
      <input-error-message :items="$v.texto.$errors" />
    </el-form-item>
  </el-form>
  <el-row justify="end">
    <p-button button-title="Aceptar" button-type="primary" :loading="isLoading" @click="submitForm" />
    <p-button button-title="Cancelar" @click="emit('cancel')" />
  </el-row>
</template>
