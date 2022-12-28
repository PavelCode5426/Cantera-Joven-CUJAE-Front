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
  <el-form inline>
    <el-form-item>
      <el-select v-model="filter.is_preubicado" placeholder="Filtrar preubicados" clearable="true">
        <el-option :value="false" label="Preubicados" />
        <el-option :value="true" label="Sin preubicación" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="filter.search" placeholder="Buscar posible graduado" style="max-width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit')">
        Filtrar
      </el-button>
    </el-form-item>
    <el-form-item :span="7">
      <button type="button" class="btn btn-primary uk-text-bold" :disabled="!multipleSelection.length" @click="importManyElement(multipleSelection)">
        <loading v-if="isLoading" /><i v-else class="entypo-list-add" /> Importar Seleccionados
      </button>
    </el-form-item>
  </el-form>
</template>
