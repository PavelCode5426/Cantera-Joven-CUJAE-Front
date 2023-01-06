<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch, withDefaults } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ElNotification } from 'element-plus'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import AvalServices from '../../../../../backed_services/aval.services'
import loading, { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import type { JovenModel } from '../../../../../backed_services/models/joven.model'
import JovenDetails from '../details/JovenDetails.vue'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

const props = withDefaults(defineProps<Props>(), { joven: undefined })
const emit = defineEmits(['cancel', 'created', 'updated'])

interface Props {
  joven: JovenModel | undefined
}
const isLoading = loading(false)
const form = ref({
  texto: 'Escriba el aval aqui...',
})
const plantillas_aval = ref<PlantillaAvalModel[]>([])
const plantillaSelected = ref<number>()
const validationsRules = {
  texto: { required },
}

const $v = useVuelidate(validationsRules, form)
const v = $v.value

const PlantillaServices = AvalServices.PlantillaServices
const UserAvalServices = AvalServices.UserAvalServices

function clearForm() {
  plantillaSelected.value = undefined
  v.$reset()
}

async function submitForm() {
  const valid = await v.$validate()
  if (valid) {
    try {
      activateLoading(isLoading)
      const joven = props.joven

      if (joven.aval) {
        await UserAvalServices.update_aval(joven.id, form.value.texto)
        emit('updated')
      }
      else {
        await UserAvalServices.create_aval(joven.id, form.value.texto)
        emit('created')
      }
    }
    catch (error: ServerError | ExceptionResponse) {
      checkServerErrorAndRedirect(error)
      checkIsAuthenticateAndRedirect(error)

      if (error.httpCode == 400)
        ElNotification.error(error.data?.details)
    }
    desactivateLoading(isLoading)
  }
  else { ElNotification.error('Formulario Incompleto') }
}
async function loadAval(joven: JovenModel) {
  try {
    activateLoading(isLoading)
    if (joven.aval) {
      const avalModel = await UserAvalServices.retrieve_aval(joven.id)
      form.value.texto = avalModel.texto
    }
    else { form.value.texto = 'Escriba el aval aqui ...' }
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}
async function loadPlantillas() {
  try {
    plantillas_aval.value = await PlantillaServices.all_plantillas()
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

watch(plantillaSelected, (newValue, oldValue) => {
  const plantillas = plantillas_aval.value
  if (plantillas !== undefined)
    form.value.texto = plantillas.find(i => i.id === newValue).texto
})
watch(props, async ({ joven }) => {
  clearForm()
  if (joven.aval)
    await loadAval(joven)
})

loadPlantillas()
loadAval(props.joven)
</script>

<template>
  <el-row>
    <el-col>
      <joven-details column="2" border :joven="joven" />
    </el-col>
  </el-row>
  <el-row>
    <el-form label-position="top">
      <el-form-item v-if="!joven?.aval" label-position="top" label="Seleccione una plantilla de aval">
        <el-select v-model="plantillaSelected">
          <el-option v-for="plantilla in plantillas_aval" :label="plantilla.nombre" :value="plantilla.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Contenido del aval">
        <editor v-model="form.texto" @update:content="form.texto = $event" @blur="$v.texto.$touch()" />
        <input-error-message :items="$v.texto.$errors" />
      </el-form-item>
    </el-form>
  </el-row>
  <el-row justify="end">
    <p-button :loading="isLoading" button-type="primary" button-title="Aceptar" @click="submitForm" />
    <p-button button-title="Cancelar" @click="emit('cancel')" />
  </el-row>
</template>
