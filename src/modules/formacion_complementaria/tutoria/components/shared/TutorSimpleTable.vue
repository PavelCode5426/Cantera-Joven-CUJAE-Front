<template>
  <el-row>
    <el-table :data="tutors">
      <el-table-column label="Nombre y Apellido">
        <template #default="scope">
          {{scope.row.first_name + ' ' + scope.row.last_name}}
        </template>
      </el-table-column>
      <el-table-column label="Correo Electronico" prop="email"/>
      <el-table-column label="Direccion" prop="direccion"/>
    </el-table>
  </el-row>
</template>
<script setup lang="ts">


import UserModel from "~/services/models/user.model";

interface Props{
  tutors:UserModel[]
}
const props = withDefaults(defineProps<Props>(), {
  tutors: [] as UserModel[]
})
</script>