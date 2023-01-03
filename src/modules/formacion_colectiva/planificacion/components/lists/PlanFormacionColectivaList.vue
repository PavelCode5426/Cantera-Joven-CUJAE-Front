<script setup lang="ts">
import { defineProps, useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <el-table>
    <el-table-column label="Identificador del plan" prop="id"/>
    <el-table-column label="Fecha creado" prop="fechaCreado"/>
    <el-table-column label="Estado" prop="estado"/>
    <slot name="default" />
  </el-table>
</template>
