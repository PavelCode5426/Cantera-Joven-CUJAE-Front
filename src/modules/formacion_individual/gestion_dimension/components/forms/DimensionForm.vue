<script setup lang="ts">
import { computed, defineProps, onBeforeUpdate, ref, watch, withDefaults } from 'vue'
import { minValue, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import AvalServices from '../../../../../backed_services/aval.services'
import loading, { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import type { DimensionModel } from '../../../../../backed_services/models/formacion_individual.model'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

interface Props {
  dimension: DimensionModel | undefined
}
const props = withDefaults(defineProps<Props>(), { dimension: undefined })

const emit = defineEmits(['cancel', 'success'])

const isLoading = loading(false)
const form = ref<DimensionModel>({
  id: props.dimension?.id,
  nombre: props.dimension?.nombre,
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
      const dimension = form.value as DimensionModel
      if (dimension.id)
        await FIndivServices.update_dimension(dimension.id, dimension)
      else await FIndivServices.create_dimension(dimension)

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
  if (props.dimension) {
    form.value = {
      id: props.dimension?.id,
      nombre: props.dimension?.nombre,
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
