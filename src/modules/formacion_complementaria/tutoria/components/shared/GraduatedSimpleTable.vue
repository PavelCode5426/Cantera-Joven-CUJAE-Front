<template>
  <el-table :data="graduates">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.first_name + ' ' + scope.row.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email"/>
    <el-table-column label="Direccion" prop="direccion"/>
    <el-table-column label="Externo">
      <template #default="scope">
        <i :class="{
          'fa fa-check-circle text-success':scope.row.esExterno,
          'fa fa-circle-o text-danger':!scope.row.esExterno,
        }"/>
      </template>
    </el-table-column>
    <el-table-column label="Nivel Superior">
      <template #default="scope">
        <i :class="{
          'fa fa-check-circle text-success':scope.row.esNivelSuperior,
          'fa fa-circle-o text-danger':!scope.row.esNivelSuperior
        }"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import GraduatedModel from "~/services/models/graduated.model";

interface Props{
  graduates:GraduatedModel[]
}
const props = withDefaults(defineProps<Props>(),{
  graduates:[] as GraduatedModel[]
})
</script>