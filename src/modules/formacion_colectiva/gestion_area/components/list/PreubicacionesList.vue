<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { TutorAsignadoModel, TutoradoAsignadoModel } from '../../../../../backed_services/models/tutorial.model'
import UbicacionLaboralModel from '../../../../../backed_services/models/ubicacion_laboral.model'


</script>

<template>
  <el-table>
    <el-table-column label="Área" prop="area.nombre" />
    <el-table-column label="Fecha" prop="fechaAsignado" />
  </el-table>
</template>
