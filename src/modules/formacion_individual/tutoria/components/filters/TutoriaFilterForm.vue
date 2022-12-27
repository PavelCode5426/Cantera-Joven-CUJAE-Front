<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import type { TutoriaFilter } from '../../../../../backed_services/tutoria.services'
import type { JovenFilter } from '~/backed_services/joven.services'

interface Props {
  filter: TutoriaFilter
}
const props = defineProps<Props>()
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-select v-model="filter.no_revocation" placeholder="Filtrar por aval" clearable="true">
        <el-option :value="false" label="Tutores actuales" />
        <el-option :value="true" label="Tutores revocados" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit')">
        Filtrar
      </el-button>
    </el-form-item>
  </el-form>
</template>
