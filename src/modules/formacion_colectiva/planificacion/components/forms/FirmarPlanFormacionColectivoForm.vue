<script setup lang="ts">
import { ref, watch } from 'vue'
import { required, requiredIf } from '@vuelidate/validators'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import useVuelidate from '@vuelidate/core'
import { storeToRefs } from 'pinia'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { EstadoPlanFormacionColectiva } from '../../../../../backed_services/models/formacion_colectiva.model'
import { PlanFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'
import FColectivaServices, { SignPlanFormacionColectiva } from '../../../../../backed_services/formacion_colectiva.services'
import formacionColectivaStore from '../../store/planificacion_colectiva.store'

interface Props {
  plan: PlanFormacionColectivaModel
}

const props = defineProps<Props>()
const emit = defineEmits(['firmado', 'rechazado'])
const showModal = ref(false)
const formacionStore = formacionColectivaStore()
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
        const response = await FColectivaServices.sign_plan_formacion(props.plan.id, new SignPlanFormacionColectiva(params.sign, params.file.raw))
        formacionStore.plan.estado = EstadoPlanFormacionColectiva.aprobado
        ElNotification.success('Plan colectivo firmado correctamente')
        emit('firmado')
      }
      else {
        const response = await FColectivaServices.sign_plan_formacion(props.plan.id, new SignPlanFormacionColectiva(params.sign))
        ElNotification.success('Plan colectivo rechazado correctamente')
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
  <el-button v-if="plan?.estado === EstadoPlanFormacionColectiva.pendiente" @click="showModal = true">
    Firmar
  </el-button>

  <el-dialog v-model="showModal" title="Firmar Plan de Formación Colectivo">
    <el-form>
      <el-form-item label="Estado del Plan">
        <el-select v-model="form.sign">
          <el-option :value="true" label="Aceptar Plan de Formación" />
          <el-option :value="false" label="Rechazar Plan de Formación" />
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
