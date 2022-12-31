<script setup lang="ts">
import { defineProps } from 'vue'
import type { TutoriaFilter } from '../../../../../backed_services/tutoria.services'
import FilterForm from '../../../../../globals/components/Filter/FilterForm.vue'
import { is_joven, is_superuser } from '../../../../../globals/permissions'

interface Props {
  filter: TutoriaFilter
}
const props = defineProps<Props>()
</script>

<template>
  <filter-form v-model:filter="filter">
    <el-form-item>
      <el-select v-model="filter.revocation" placeholder="Filtrar por tutoria" clearable="true">
        <el-option :value="false" label="Actuales" />
        <el-option :value="true" label="Revocados" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="!is_joven || is_superuser">
      <el-select v-model="filter.has_aval" placeholder="Filtrar por aval" clearable="true">
        <el-option :value="false" label="Sin aval" />
        <el-option :value="true" label="Con aval" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="!is_joven || is_superuser">
      <el-select v-model="filter.has_plan" placeholder="Filtrar por plan" clearable="true">
        <el-option :value="false" label="Sin plan" />
        <el-option :value="true" label="Con plan" />
      </el-select>
    </el-form-item>
  </filter-form>
</template>
