<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { ActividadFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'
const slots = useSlots()
</script>

<template>
  <el-table>
    <el-table-column label="Nombre" prop="nombre" />
    <el-table-column label="Fecha Inicio" prop="fechaInicio" />
    <el-table-column label="Fecha Fin" prop="fechaFin" />
    <el-table-column label="¿Actividad Específica?" prop="esEspecifica" />
  </el-table>
</template>
