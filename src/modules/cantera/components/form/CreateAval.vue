<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Índice Académico">
      <el-input v-model="form.indiceAcademico" class="w-50 m-2"/>
      <el-input
          v-model="form.indiceAcademico"
          class="w-50 m-2"
          size="small"
      />
    </el-form-item>
    <el-form-item label="¿Es militante?">
      <el-switch
          v-model="form.esMilitante"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
      />
    </el-form-item>
    <el-form-item label="Factores Universitarios">
      <el-switch
          v-model="form.factoresUniversitarios"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
      />
    </el-form-item>
    <el-form-item label="Factores Trayecoria">
      <el-switch
          v-model="form.factoresTrayectoria"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
      />
    </el-form-item>
    <el-form-item label="¿Participó Tareas de Impacto?">
      <el-switch
          v-model="form.participoTareasImpacto"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
      />
    </el-form-item>
    <el-form-item label="Departamento Alumno Ayudante">
      <el-input v-model="form.departamento_AA" />
    <el-form-item label="Cargos como Estudiante:">
      <el-input v-model="form.cargosEstudiante" type="textarea" />
    </el-form-item>
    <el-form-item label="Cargos como Militante">
      <el-input v-model="form.cargosMilitante" type="textarea" />
    </el-form-item>
    <el-form-item label="Resumen Desempeño">
      <el-input v-model="form.resumenDesempeno" type="textarea" />
    </el-form-item>
    <el-form-item>
      <template #footer>
        <div class="modal-footer">
          <button class="btn btn-info" @click="submitForm()" :class="{disabled:!form.name.length}">
            <loading v-if="isLocalLoading"/> Crear
          </button>
          <button class="btn btn-default" @click="closeDialog()">Cerrar</button>
        </div>
      </template>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>

import { reactive } from 'vue'
import avalService from "@/services/aval.services"
import defaulDialogFormProps from "@/globals/composables/useDialogForm"
import useVuelidate from "@vuelidate/core"

//USE COMPOSABLES
import isLocalLoading, {
  activateLoading,
  desactivateLoading,
  toogleLoadingDecorator
} from "@/globals/composables/useLoading"
import {required} from "@vuelidate/validators";
import {checkIsAuthenticateAndChangeStorage, checkServerErrorAndMessage, isAuthenticate} from "~/helpers/utils";
import AvalModel from "~/services/models/aval.model";

interface DialogFormProp {
  dialogVisible:boolean | undefined
}

withDefaults(defineProps<DialogFormProp>(),{
  ...defaulDialogFormProps
})

const form = reactive( {
  indiceAcademico: '',
  esMilitante: false,
  departamento_AA: '',
  factoresUniversitarios: false,
  factoresTrayectoria: false,
  participoTareasImpacto: false,
  cargosEstudiante: '',
  cargosMilitante: '',
  resumenDesempeno: '',

} as AvalModel)

const validationsRules = {
  name: {required}
}
const v = useVuelidate(validationsRules,form).value

const emit = defineEmits(['on-success-create'])
const closeDialog:Function | undefined = inject('closeCreateDialog')

let submitForm = async () => {
  const isFormCorrect = await v.$validate()
  if (isFormCorrect) {
    const aval = form.value

    const response = await avalService.createAval(aval, )
    if(!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)){
      closeDialog()
      ElMessage.success({message:"Aval creado correctamente"})
      emit('on-success-create')
    }
  }
}
submitForm = toogleLoadingDecorator(submitForm)

function clearForm(){
  form.value.indiceAcademico = ''
  form.value.esMilitante = false
  form.value.departamento_AA = ''
  form.value.factoresUniversitarios = false
  form.value.factoresTrayectoria = false
  form.value.participoTareasImpacto = false
  form.value.cargosEstudiante = ''
  form.value.cargosMilitante = ''
  form.value.resumenDesempeno = ''
}



</script>


<style scoped>

</style>