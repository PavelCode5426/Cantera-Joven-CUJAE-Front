<script setup lang="ts">
import { computed, defineProps, onBeforeUpdate, ref, watch, withDefaults } from 'vue'
import { minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import AvalServices from '../../../../../backed_services/aval.services'
import loading, { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import type { PropuestaMovimientoModel } from '../../../../../backed_services/models/formacion_individual.model'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

interface Props {
  propuesta: PropuestaMovimientoModel | undefined
}
const props = withDefaults(defineProps<Props>(), { propuesta: undefined })

const emit = defineEmits(['cancel', 'success'])

const isLoading = loading(false)
const form = ref<PlantillaAvalModel>({
  id: props.propuesta?.id,
  nombre: props.propuesta?.nombre,
})

const validationsRules = {
  nombre: { required },
}
const $v = useVuelidate(validationsRules, form)
const v = $v.value

async function submitForm() {
  const valid = await v.$validate()
  if (valid) {
    try {
      activateLoading(isLoading)
      const propuesta = form.value as PropuestaMovimientoModel
      if (propuesta.id)
        await FIndivServices.update_propuestas_movimiento(propuesta.id, propuesta)
      else await FIndivServices.create_propuestas_movimiento(propuesta)

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
  if (props.propuesta) {
    form.value = {
      id: props.propuesta?.id,
      nombre: props.propuesta?.nombre,
    }
  }
  else {
    form.value = {
      id: undefined,
      nombre: '',
    }
  }
  v.$reset()
}

watch(props, clearForm)
</script>

<template>
  <el-form>
    <el-form-item label="Nombre">
      <el-input v-model="form.nombre" @blur="$v.nombre.$touch()" />
      <input-error-message :items="$v.nombre.$errors" />
    </el-form-item>
  </el-form>
  <el-row justify="end">
    <p-button button-title="Aceptar" button-type="primary" :loading="isLoading" @click="submitForm" />
    <p-button button-title="Cancelar" @click="emit('cancel')" />
  </el-row>
</template>
