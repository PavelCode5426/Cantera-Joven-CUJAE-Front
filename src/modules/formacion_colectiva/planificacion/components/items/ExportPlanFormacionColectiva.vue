<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { PlanFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'

interface Prop {
  plan: PlanFormacionColectivaModel
}

const props = defineProps<Prop>()

const pdf_link = computed(() => {
  if (props.plan?.documento && props.plan?.estado === EstadoPlanFormacion.aprobado)
    return props.plan.documento.archivo
  return `${import.meta.env.VITE_URL_SERVER}/plan-colectivo/${props.plan?.id}/exportar-pdf`
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
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>
