<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import type { TutoriaFilter } from '../../../../../backed_services/tutoria.services'
import FilterForm from '../../../../../globals/components/Filter/FilterForm.vue'
import type { JovenFilter } from '~/backed_services/joven.services'

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
  </filter-form>
</template>
