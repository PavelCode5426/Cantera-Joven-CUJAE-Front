<script setup lang="ts">
import { defineProps } from 'vue'
import { EstadoPlanFormacionColectiva } from '../../../../../backed_services/models/formacion_colectiva.model'
import { is_director_recursos_humanos, is_vicerrector } from '../../../../../globals/permissions'

interface Props {
  estado: EstadoPlanFormacionColectiva
}
const props = defineProps<Props>()
</script>

<template>
  <el-select v-model="estado" placeholder="Estado del Plan">
    <el-option :disabled="!is_director_recursos_humanos" :value="EstadoPlanFormacionColectiva.desarrollo" label="En desarrollo" />
    <el-option :disabled="!is_director_recursos_humanos" :value="EstadoPlanFormacionColectiva.pendiente" label="Pendiente de revision" />
  </el-select>
</template>
