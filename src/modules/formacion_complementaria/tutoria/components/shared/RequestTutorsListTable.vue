<template>
  <el-table :data="tutorRequests">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{scope.row.graduado.first_name + ' ' + scope.row.graduado.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="graduado.email"/>
    <el-table-column label="Direccion" prop="graduado.direccion"/>
    <el-table-column label="Area" prop="area"/>
    <el-table-column label="Externo">
      <template #default="scope">
        <i :class="{
          'fa fa-check-circle text-success':scope.row.graduado.esExterno,
          'fa fa-circle-o text-danger':!scope.row.graduado.esExterno,
        }"/>
      </template>
    </el-table-column>
    <el-table-column label="Nivel Superior">
      <template #default="scope">
        <i :class="{
          'fa fa-check-circle text-success':scope.row.graduado.esNivelSuperior,
          'fa fa-circle-o text-danger':!scope.row.graduado.esNivelSuperior
        }"/>
      </template>
    </el-table-column>
    <el-table-column label="Estado" v-if="showStatus">
      <template #default="scope">
        <el-tag v-if="scope.row.respuesta == undefined">Sin Respuesta</el-tag>
        <el-tag v-else-if="scope.row.respuesta" type="success">Aceptada</el-tag>
        <el-tag v-else type="danger">Rechazada</el-tag>

      </template>
    </el-table-column>
    <el-table-column label="Tiempo" prop="fechaCreado"/>
  </el-table>

</template>

<script setup lang="ts">

import {TutorRequestModel} from "~/services/models/tutorrequest.model";

interface Props{
  tutorRequests:TutorRequestModel[],
  showStatus:boolean
}
const props = withDefaults(defineProps<Props>(), {
  tutorRequests: [] as TutorRequestModel[],
  showStatus:false
})

</script>