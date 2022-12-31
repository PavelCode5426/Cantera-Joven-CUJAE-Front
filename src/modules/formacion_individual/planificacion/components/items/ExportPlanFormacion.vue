<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { PlanFormacionModel } from '../../../../../backed_services/models/formacion_individual.model'

interface Prop {
  plan: PlanFormacionModel
}

const props = defineProps<Prop>()

const pdf_link = computed(() => {
  return `${import.meta.env.VITE_URL_SERVER}/plan-individual/${props.plan?.id}/export-pdf`
})
const calendar_link = computed(() => {
  return `${import.meta.env.VITE_URL_SERVER}/plan-individual/${props.plan?.id}/export-calendar`
})
</script>

<template>
  <el-dropdown>
    <el-button type="primary">
      Exportar <el-icon class="el-icon--right">
        <i class="fa fa-angle-down" />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <a target="_blank" :href="pdf_link" download>
          <el-dropdown-item>Exportar a PDF</el-dropdown-item>
        </a>
        <a target="_blank" :href="calendar_link" download>
          <el-dropdown-item>Exportar a Calendario</el-dropdown-item>
        </a>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>
