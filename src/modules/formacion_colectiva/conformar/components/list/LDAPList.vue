<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['import-item'])
</script>

<template>
  <el-table>
    <el-table-column type="selection" width="55" />
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ scope.row.name }} {{ scope.row.surname }} {{ scope.row.lastname }}
      </template>
    </el-table-column>
    <el-table-column label="Correo" prop="email" />
    <el-table-column label="Carnet" prop="identification" />
    <el-table-column label="Usuario" prop="user" />
    <el-table-column align="right">
      <template #default="scope">
        <confirm-pop-button
          confirm-button-type="primary"
          button-title="Importar"
          button-type="btn-primary"
          button-icon=""
          title="¿Esta seguro que desea imporar el elemento?"
          @on-confirm="emit('import-item', scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>
