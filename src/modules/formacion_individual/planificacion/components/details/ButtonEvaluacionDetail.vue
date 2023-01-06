<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type {
  EvaluacionFinalModel,
  EvaluacionFormacionModel,
} from '../../../../../backed_services/models/formacion_individual.model'

interface Prop {
  evaluacion: EvaluacionFinalModel | EvaluacionFormacionModel
}
const props = defineProps<Prop>()
const showDialog = ref(false)
</script>

<template>
  <p-button button-icon="fa fa-external-link" size="small" @click="showDialog = true" />

  <!--  <el-button @click="showDialog = true"> -->
  <!--    Mostrar Evaluacion -->
  <!--  </el-button> -->

  <el-dialog v-model="showDialog">
    <evaluacion-detail :evaluacion="evaluacion" />
  </el-dialog>
</template>
