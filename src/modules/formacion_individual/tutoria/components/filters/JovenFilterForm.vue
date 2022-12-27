<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import type { JovenFilter } from '~/backed_services/joven.services'

interface Props {
  filter: JovenFilter
}
const props = defineProps<Props>()
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-select v-model="filter.has_aval" placeholder="Filtrar por aval" clearable="true">
        <el-option :value="false" label="Sin aval" />
        <el-option :value="true" label="Con aval" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filter.has_plan" placeholder="Filtrar por plan" clearable="true">
        <el-option :value="false" label="Sin plan" />
        <el-option :value="true" label="Con plan" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filter.has_tutor" placeholder="Filtrar por tutores" clearable="true">
        <el-option :value="false" label="Sin tutor" />
        <el-option :value="true" label="Con tutor" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="filter.search" placeholder="Buscar joven" style="max-width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit')">
        Filtrar
      </el-button>
    </el-form-item>
  </el-form>
</template>
