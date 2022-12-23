<script setup lang="ts">
import { computed, defineProps, onBeforeUpdate, ref, watch, withDefaults } from 'vue'
import { minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import PlantillaServices from '../../../../../backed_services/aval.services'
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
  form.value = {
    id: props.plantilla?.id,
    texto: props.plantilla?.texto,
    nombre: props.plantilla?.nombre,
  }
  v.$reset()
}

watch(props, clearForm)
</script>

<template>
  <el-input v-model="$v.nombre.$model" placeholder="Nombre de la Plantilla" @blur="$v.nombre.$touch()" />
  <error-help-block :items="$v.nombre.$errors" />
  <el-input v-model="$v.texto.$model" placeholder="Cuerpo de la Plantilla" @blur="$v.texto.$touch()" />
  <error-help-block :items="$v.texto.$errors" />

  <div class="modal-footer">
    <button class="btn btn-info" @click="submitForm">
      <loading v-if="isLoading" /> Aceptar
    </button>
    <button class="btn btn-default" @click="emit('cancel')">
      Cerrar
    </button>
  </div>
</template>
