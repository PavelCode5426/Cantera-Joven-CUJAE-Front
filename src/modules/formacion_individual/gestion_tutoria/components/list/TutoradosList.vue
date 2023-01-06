<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { TutoradoAsignadoModel } from '../../../../../backed_services/models/tutorial.model'

const slots = useSlots()

const fechaEstado = (tutoria: TutoradoAsignadoModel) => {
  if (tutoria.fechaRevocado)
    return tutoria.fechaRevocado.toString()
  else return tutoria.fechaAsignado.toString()
}
</script>

<template>
  <el-table>
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ scope.row.joven.first_name }} {{ scope.row.joven.last_name }}
      </template>
    </el-table-column>
    <el-table-column label="Correo" prop="joven.email" />
    <el-table-column label="Carnet" prop="joven.carnet" />
    <el-table-column label="Usuario" prop="joven.username" />
    <el-table-column label="Estado">
      <template #default="scope">
        <el-tooltip placement="top" :content="fechaEstado(scope.row)">
          <tutoria-status :status="scope.row.fechaRevocado === null" />
        </el-tooltip>
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>
