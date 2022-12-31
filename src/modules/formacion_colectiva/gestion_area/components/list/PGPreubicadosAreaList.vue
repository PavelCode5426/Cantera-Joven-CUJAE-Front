<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { TutorAsignadoModel, TutoradoAsignadoModel } from '../../../../../backed_services/models/tutorial.model'
import UbicacionLaboralModel from '../../../../../backed_services/models/ubicacion_laboral.model'

</script>

<template>
  <el-table>
    <el-table-column label="Nombre" prop="posiblegraduado.first_name" />
    <el-table-column label="Apellidos" prop="posiblegraduado.last_name" />
    <el-table-column label="Correo" prop="posiblegraduado.email" />
    <el-table-column label="Carnet" prop="posiblegraduado.carnet" />
    <el-table-column label="Usuario" prop="posiblegraduado.username" />
    <el-table-column label="Asignado" prop="fechaAsignado" />
  </el-table>
</template>
