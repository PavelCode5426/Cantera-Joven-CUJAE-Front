<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps()
</script>

<template>
  <el-table>
    <el-table-column label="Fecha de Firma" prop="fecha" />
    <el-table-column>
      <template #default="{ row }">
        <a :href="row?.archivo" target="_blank"><el-button>Descargar</el-button></a>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
