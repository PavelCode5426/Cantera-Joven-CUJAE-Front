<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { EvaluacionModel } from '../../../../../backed_services/models/formacion_individual.model'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'

interface Prop {
  evaluacion: EvaluacionModel
}

const prop = defineProps<Prop>()
const emit = defineEmits(['success', 'cancel'])

async function submitForm() {
  ElMessageBox.confirm('Esta seguro que desea aprobar la evaluacion?').then(
    () => {
      FIndivServices.aprobar_evaluacion_formacion(prop.evaluacion.id).then(
        () => emit('success'),
      ).catch(reason => alert(reason))
    },
  )
}
</script>

<template>
  <el-row justify="end">
    <el-button @click="submitForm">
      Aprobar
    </el-button>
    <el-button @click="emit('cancel')">
      Cancelar
    </el-button>
  </el-row>
</template>

