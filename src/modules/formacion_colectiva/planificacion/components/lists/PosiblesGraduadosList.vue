<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <el-table>
    <el-table-column type="selection" width="55" />
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ scope.row.first_name }} {{ scope.row.last_name }}
      </template>
    </el-table-column>
    <el-table-column label="Correo" prop="email" />
    <el-table-column label="Carnet" prop="carnet" />
    <el-table-column label="Usuario" prop="username" />
    <slot />
  </el-table>
</template>
