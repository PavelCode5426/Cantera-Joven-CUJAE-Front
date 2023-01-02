<script setup lang="ts">
import { ref, watch } from 'vue'
import { required, requiredIf } from '@vuelidate/validators'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import useVuelidate from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import type { PlanFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FIndivServices, { SignPlanFormacion } from '../../../../../backed_services/formacion_individual.services'
import formacionIndividualStore from '../../store/planificacion_individual.store'

interface Props {
  plan: PlanFormacionModel
}

const props = defineProps<Props>()
const emit = defineEmits(['firmado', 'rechazado'])
const showModal = ref(false)
const formacionStore = formacionIndividualStore()
const { plan: planStore } = storeToRefs(formacionStore)

const form = ref({
  sign: undefined,
  file: undefined,
})
const formValidation = {
  sign: { required },
  // file: { requiredIf: requiredIf(() => form.value.sign) },
}
const $v = useVuelidate(formValidation, form)
const v = $v.value

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  // upload.value!.clearFiles()
  // const file = files[0] as UploadRawFile
  // file.uid = genFileId()
  // upload.value!.handleStart(file)
}

const onChange: UploadProps['onChange'] = (file, files) => {
  form.value.file = file
}

function clearForm() {
  form.value = {
    sign: undefined,
    file: undefined,
  }
  v.$reset()
}

async function submitForm() {
  const valid = await v.$validate()
  if (valid) {
    try {
      const params = form.value
      if (params.sign) {
        const response = await FIndivServices.sign_plan_formacion(props.plan.id, new SignPlanFormacion(params.sign, params.file.raw))
        formacionStore.plan.estado = EstadoPlanFormacion.aprobado
        ElNotification.success('Plan firmado correctamente')
        emit('firmado')
      }
      else {
        const response = await FIndivServices.sign_plan_formacion(props.plan.id, new SignPlanFormacion(params.sign))
        formacionStore.plan.estado = EstadoPlanFormacion.rechazado
        ElNotification.success('Plan rechazado correctamente')
        emit('rechazado')
      }
      showModal.value = false
    }
    catch (error: ServerError | ExceptionResponse) {
      alert(error)
      alert(error.httpCode)
    }
  }
}
watch(showModal, (newValue) => {
  if (!newValue)
    clearForm()
})
</script>

<template>
  <el-button v-if="plan?.estado === EstadoPlanFormacion.pendiente" @click="showModal = true">
    Firmar
  </el-button>

  <el-dialog v-model="showModal" title="Firmar Plan de Formacion Individual">
    <el-form>
      <el-form-item label="Estado del Plan">
        <el-select v-model="form.sign">
          <el-option :value="true" label="Aceptar Plan de Formacion" />
          <el-option :value="false" label="Rechazar Plan de Formacion" />
        </el-select>
        <input-error-message :items="$v.sign.$errors" />
      </el-form-item>
      <el-form-item v-if="form.sign">
        <el-upload
          :ref="upload"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :on-change="onChange"
        />
        <!--        <input-error-message :items="$v.file.$errors"/> -->
      </el-form-item>
    </el-form>
    <el-row justify="end">
      <el-button @click="submitForm">
        Aceptar
      </el-button>
      <el-button @click="showModal = false">
        Cancelar
      </el-button>
    </el-row>
  </el-dialog>
</template>
