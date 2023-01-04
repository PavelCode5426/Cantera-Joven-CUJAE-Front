<script setup lang="ts">
import { defineProps } from 'vue'
import type { TutoriaFilter } from '../../../../../backed_services/tutoria.services'
import FilterForm from '../../../../../globals/components/Filter/FilterForm.vue'
import { is_joven, is_superuser } from '../../../../../globals/permissions'
import type { EvaluacionFilter } from '../../../../../backed_services/formacion_individual.services'

interface Props {
  filter: EvaluacionFilter
}
const props = defineProps<Props>()
</script>

<template>
  <filter-form v-model:filter="filter">
    <el-form-item>
      <el-select v-model="filter.pendiente" placeholder="Filtrar por estado" clearable="true">
        <el-option :value="true" label="Pendiente" />
        <el-option :value="false" label="Respondida" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="!is_joven || is_superuser">
      <el-select v-model="filter.esSatisfactorio" placeholder="Filtrar por resultado" clearable="true">
        <el-option :value="true" label="Satisfactorio" />
        <el-option :value="false" label="No Satisfactorio" />
      </el-select>
    </el-form-item>
  </filter-form>
</template>
