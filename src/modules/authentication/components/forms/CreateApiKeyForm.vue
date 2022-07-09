<template>
  <el-dialog v-model="dialogVisible" title="Crear nuevo APIKEY" :closed="clearForm()" :show-close="false">
    <el-form>
      <el-form-item label="Nombre del Sistema">
        <el-input v-model="form.name" @blur="v.name.$touch()"/>
        <error-help-block :items="v.name.$errors"/>
      </el-form-item>
      <el-form-item label="Fecha de Expiracion">
        <el-date-picker v-model="form.expired_at" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="modal-footer">
        <button class="btn btn-info" @click="submitForm()" :class="{disabled:!form.name.length}">
          <loading v-if="isLocalLoading"/> Aceptar
        </button>
        <button class="btn btn-default" @click="closeDialog()">Cerrar</button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import defaulDialogFormProps from "@/globals/composables/useDialogForm"
import {required} from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import authServices from "@/services/auth.services"
import {checkIsAuthenticateAndRedirect, checkServerErrorAndMessage, isAuthenticate} from "@/helpers/utils";
import dayjs from "dayjs"

//USE COMPOSABLES
import isLocalLoading, {
  activateLoading,
  desactivateLoading,
  toogleLoadingDecorator
} from "@/globals/composables/useLoading"

interface DialogFormProp {
  dialogVisible:boolean | undefined
}
withDefaults(defineProps<DialogFormProp>(),{
  ...defaulDialogFormProps
})

const form = ref({
  name:'',
  expired_at:null
})
const validationsRules = {
  name: {required}
}
const v = useVuelidate(validationsRules,form).value

const emit = defineEmits(['on-success-create'])
const closeDialog:Function | undefined = inject('closeCreateDialog')

let submitForm = async () => {
  const isFormCorrect = await v.$validate()
  if (isFormCorrect) {
    const name = form.value.name
    let expired_at = form.value.expired_at
    if (expired_at)
      expired_at = dayjs(expired_at).format() //PREGUNTAR A LAURA
    const response = await authServices.createApiKey(name,expired_at)
    if(!checkServerErrorAndMessage(response) && isAuthenticate(response)){
      closeDialog()
      emit('on-success-create')
    }
  }
}
submitForm = toogleLoadingDecorator(submitForm)

function clearForm(){
  form.value.name = ''
  form.value.expired_at = null
}


</script>