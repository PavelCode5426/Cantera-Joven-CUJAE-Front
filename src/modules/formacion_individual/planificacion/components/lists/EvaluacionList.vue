<script lang="ts" setup>
import { defineProps, useSlots } from 'vue'
import { EvaluacionFinalModel } from '../../../../../backed_services/models/formacion_individual.model'
import type { EvaluacionModel } from '../../../../../backed_services/models/formacion_individual.model'

interface Prop {
  data: EvaluacionModel[]
}
const props = defineProps<Prop>()
const slot = useSlots()
</script>

<template>
  <el-table :data="data">
    <el-table-column label="Nombre y Apellidos">
      <template #default="{ row }">
        {{ row.joven.first_name }} {{ row.joven.last_name }}
      </template>
    </el-table-column>
    <el-table-column label="Carnet" prop="joven.carnet" />
    <el-table-column label="Correo" prop="joven.email" />
    <el-table-column label="Fecha" prop="fechaCreado" />
    <el-table-column label="Estado">
      <template #default="{ row }">
        <el-tag v-if="row.aprobadoPor" type="success">
          Aprobado
        </el-tag>
        <el-tag v-else>
          Pendiente
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="{ row }">
        <el-tag v-if="row.propuestaMovimiento">
          Evaluacion Final
        </el-tag>
        <el-tag v-else>
          Evaluacion Parcial
        </el-tag>
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>
