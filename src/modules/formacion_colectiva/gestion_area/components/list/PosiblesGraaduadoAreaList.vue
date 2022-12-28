<script setup lang="ts">
import { defineProps, ref } from 'vue'
import {PosibleGraduadoModel} from "../../../../../backed_services/models/posible_graduado.model";

interface Props {
  data: PosibleGraduadoModel[]
}

const props = defineProps<Props>()
const emit = defineEmits(['reload'])
const selectedUser = ref<PosibleGraduadoModel | undefined>(undefined)
const modal = ref(false)

function showModal(user: PosibleGraduadoModel) {
  selectedUser.value = user
  modal.value = true
}

</script>

<template>
  <el-table :data="data">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ scope.row.first_name }} {{ scope.row.last_name }}
      </template>
    </el-table-column>
    <el-table-column label="Correo" prop="email" />
    <el-table-column label="Carnet" prop="carnet" />
    <el-table-column label="Usuario" prop="username" />
  </el-table>
</template>
