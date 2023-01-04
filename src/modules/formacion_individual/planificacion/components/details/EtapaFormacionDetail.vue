<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { DimensionModel, EtapaFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'

interface Props {
  etapa: EtapaFormacionModel
}

const props = defineProps<Props>()
const showDialog = ref(false)
</script>

<template>
  <el-descriptions>
    <el-descriptions-item label="Objetivo">
      {{ etapa.objetivo }}
    </el-descriptions-item>
    <el-descriptions-item label="Dimension">
      {{ etapa.dimension?.nombre }}
    </el-descriptions-item>
    <el-descriptions-item label="Fecha de Inicio">
      {{ etapa.fechaInicio }}
    </el-descriptions-item>
    <el-descriptions-item label="Fecha de Fin">
      {{ etapa.fechaFin }}
    </el-descriptions-item>
  </el-descriptions>

  <el-row v-if="etapa.evaluacion">
    <el-button @click="showDialog = true">
      Mostrar Evaluacion
    </el-button>
  </el-row>

  <el-dialog v-model="showDialog">
    <evaluacion-detail :evaluacion="etapa.evaluacion" />
  </el-dialog>
</template>
