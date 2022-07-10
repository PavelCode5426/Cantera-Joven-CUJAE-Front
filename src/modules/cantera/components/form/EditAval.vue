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
import AvalService from "@/services/aval.services"
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
import {AvalService} from "~/services/aval.services";

interface DialogFormProp {
  dialogVisible:boolean | undefined
}

withDefaults(defineProps<DialogFormProp>(),{
  ...defaulDialogFormProps
})

const validationsRules = {
  name: {required}
}
const v = useVuelidate(validationsRules,form).value

export default {
  mounted() {
    this.id = this.$route.params.id
    this.form.indiceAcademico = this.$root.aval[this.id].indiceAcademico
    this.form.esMilitante = this.$root.aval[this.id].esMilitante
    this.form.departamento_AA = this.$root.aval[this.id].departamento_AA
    this.form.factoresUniversitarios = this.$root.aval[this.id].factoresUniversitarios
    this.form.factoresTrayectoria = this.$root.aval[this.id].factoresTrayectoria
    this.form.participoTareasImpacto = this.$root.aval[this.id].participoTareasImpacto
    this.form.cargosEstudiante = this.$root.aval[this.id].cargosEstudiante
    this.form.cargosMilitante = this.$root.aval[this.id].cargosMilitante
    this.form.resumenDesempeno = this.$root.aval[this.id].resumenDesempeno
  },
  data() {
    return {
      id:0,
      form: {
        indiceAcademico: '',
        esMilitante: false,
        departamento_AA: '',
        factoresUniversitarios: false,
        factoresTrayectoria: false,
        participoTareasImpacto: false,
        cargosEstudiante: '',
        cargosMilitante: '',
        resumenDesempeno: '',
      } as AvalModel
    }
  },
  let submitForm = async () => {
      const isFormCorrect = await v.$validate()
      if (isFormCorrect) {
        {
          this.$root.aval[this.id].indiceAcademico = this.form.indiceAcademico
          this.$root.aval[this.id].esMilitante = this.form.esMilitante
          this.$root.aval[this.id].departamento_AA = this.form.departamento_AA
          this.$root.aval[this.id].factoresUniversitarios = this.form.factoresUniversitarios
          this.$root.aval[this.id].factoresTrayectoria = this.form.factoresTrayectoria
          this.$root.aval[this.id].participoTareasImpacto = this.form.participoTareasImpacto
          this.$root.aval[this.id].cargosEstudiante = this.form.cargosEstudiante
          this.$root.aval[this.id].cargosMilitante = this.form.cargosMilitante
          this.$root.aval[this.id].resumenDesempeno = this.form.resumenDesempeno
        } const aval

        const response = await AvalService.updateAval(id, aval)
        if(!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)){
          closeDialog()
          ElMessage.success({message:"Aval modificado correctamente"})
          emit('on-success-create')
        }
      }
    },
    submitForm = toogleLoadingDecorator(submitForm)
}

</script>


<style scoped>

</style>