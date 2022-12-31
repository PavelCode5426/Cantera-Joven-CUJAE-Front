<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import type {PosibleGraduadoModel} from '~/backed_services/models/posible_graduado.model'
import {PreubicacionFilter} from "../../../../../backed_services/gestionar_area.services";

interface Props {
  filter: PreubicacionFilter
}
const props = defineProps<Props>()
</script>

<template>
  <filter-form>
    <el-form-item>
      <el-select v-model="filter.is_preubicado" placeholder="Filtrar preubicados" clearable="true">
        <el-option :value="false" label="Preubicados" />
        <el-option :value="true" label="Sin preubicación" />
      </el-select>
    </el-form-item>
  </filter-form>
</template>
