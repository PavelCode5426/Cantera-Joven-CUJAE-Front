<script setup lang="ts">
import { defineProps, useSlots } from 'vue'

const slots = useSlots()
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
    <slot name="default" />
  </el-table>
</template>
