<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import type { SolicitudTutoriaFilter, TutoriaFilter } from '../../../../../backed_services/tutoria.services'

import type { JovenFilter } from '~/backed_services/joven.services'

interface Props {
  filter: SolicitudTutoriaFilter
}
const props = defineProps<Props>()
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-select v-model="filter.is_pendiente" placeholder="Filtrar por estado" clearable="true">
        <el-option :value="false" label="Solicitudes atendidas" />
        <el-option :value="true" label="Solicitudes pendientes" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filter.is_enviada" placeholder="Filtrar por tipo" clearable="true">
        <el-option :value="false" label="Solicitudes recibidas" />
        <el-option :value="true" label="Solicitudes enviadas" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit')">
        Filtrar
      </el-button>
    </el-form-item>
  </el-form>
</template>
