<template>
  <el-table :data="students">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.first_name + ' ' + scope.row.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email"/>
    <el-table-column label="Direccion" prop="direccion"/>
    <el-table-column label="Año Academico" prop="anno"/>
    <el-table-column label="Aval">
      <template #default="scope">
        <el-tag v-if="scope.row.aval" type="success">Aval Listo</el-tag>
        <el-tag v-else type="danger">Sin Aval</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import StudentModel from "~/services/models/student.model";

interface Props{
  students:StudentModel[]
}
const props = withDefaults(defineProps<Props>(),{
  students:[] as StudentModel[]
})
</script>