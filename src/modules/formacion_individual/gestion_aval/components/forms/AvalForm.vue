<script setup lang="ts">
import { computed, defineProps, onMounted, ref, watch, withDefaults } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ElNotification } from 'element-plus'
import { onUnmounted } from 'vue-demi'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import AvalServices from '../../../../../backed_services/aval.services'
import loading, { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import type { JovenModel } from '../../../../../backed_services/models/joven.model'
import { load_script, unload_script } from '../../../../../helpers/vue.loadscript'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

interface Props {
  joven: JovenModel | undefined
}
const props = withDefaults(defineProps<Props>(), { joven: undefined })
const emit = defineEmits(['cancel', 'created', 'updated'])

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
      // TODO FALTA BUSCAR PORQUE NO PONE EL RESPONSE AQUI
      const avalModel = await UserAvalServices.retrieve_aval(joven.id)
    }
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
  v.texto.$model = plantillas_aval.value.find(i => i.id === newValue).texto
  // window.CKEditor
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
      <el-descriptions title="Informacion del Joven" column="2" border>
        <el-avatar size="large" />
        <el-descriptions-item label="Nombre">
          {{ joven?.first_name }}
        </el-descriptions-item>
        <el-descriptions-item label="Apellidos">
          {{ joven?.last_name }}
        </el-descriptions-item>
        <el-descriptions-item label="Carnet">
          {{ joven?.carnet }}
        </el-descriptions-item>
        <el-descriptions-item label="Area">
          {{ joven?.area.nombre }}
        </el-descriptions-item>
        <el-descriptions-item label="Direccion">
          {{ joven?.direccion }}
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form>
        <el-form-item v-if="!joven?.aval" label-position="top" label="Seleccione una plantilla de aval">
          <el-select v-model="plantillaSelected">
            <el-option v-for="plantilla in plantillas_aval" :label="plantilla.nombre" :value="plantilla.id" />
          </el-select>
        </el-form-item>
        <el-form-item required error="$v.texto.$error">
          <textarea id="ckeditor" v-model="form.texto" name="ckeditor" rows="6" @blur="$v.texto.$touch()" />
          <Trumbowyg v-model="form.texto" />
          <template #error>
            <input-error-message :items="$v.texto.$errors" />
          </template>
        </el-form-item>
        <el-button @click="submitForm">
          Aplicar
        </el-button>
        <el-button @click="emit('cancel')">
          Cancelar
        </el-button>
      </el-form>
    </el-col>
  </el-row>
</template>
