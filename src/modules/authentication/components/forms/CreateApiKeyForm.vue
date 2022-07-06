<template>
  <el-dialog v-model="dialogVisible" title="Crear nuevo APIKEY" :closed="clearForm()">
    <div class="row">
      <h5>Nombre del Sistema<spam class="text-danger">*</spam></h5>
      <el-input v-model="form.name"/>
      <error-help-block :items="v.name.$errors"/>
      <h5>Fecha de Expiracion</h5>
      <el-date-picker v-model="form.expired_at" />
    </div>
    <template #footer>
      <div class="modal-footer">
        <button class="btn btn-info" @click="submitForm()">
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

interface DialogFormProp {
  dialogVisible:boolean | undefined
}
withDefaults(defineProps<DialogFormProp>(),{
  ...defaulDialogFormProps
})

const isLocalLoading = ref(false)
const form = ref({
  name:'',
  expired_at:null
})
const validationsRules = {
  name: {required}
}
const v = useVuelidate(validationsRules,form).value

const closeDialog:Function | undefined = inject('closeCreateDialog')

async function submitForm(){
  const isFormCorrect = await v.$validate()
  if (isFormCorrect) {
    isLocalLoading.value = true
    // closeDialog()
  }
  setTimeout(() => isLocalLoading.value = false,1000)
}
function clearForm(){
  form.value.name = ''
  form.value.expired_at = null
}







</script>