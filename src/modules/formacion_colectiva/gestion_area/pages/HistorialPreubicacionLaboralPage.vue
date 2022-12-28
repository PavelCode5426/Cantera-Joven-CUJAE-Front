<script setup lang="ts">
import { defineProps, ref } from 'vue'
import {PosibleGraduadoModel} from '~/backed_services/models/posible_graduado.model'
import UbicacionLaboralModel from '~backed_services/models/ubicacion_laboral.model'
import gestionarAreaServices from '../../../../../backed_services/gestionar_area.services'


interface Props {
  data: UbicacionLaboralModel[]
}

const props = defineProps<Props>()
const emit = defineEmits(['reload'])
const selectedUser = ref<UbicacionLaboralModel | undefined>(undefined)
const modal = ref(false)

function showModal(user: UbicacionLaboralModel) {
  selectedUser.value = user
  modal.value = true
}
</script>

<template>
  <h3>Historial de preubicación de los posibles graduados</h3>
  <el-row justify="space-between">
    <el-col :span="6">
      <el-input v-model="search" placeholder="Buscar posible graduado" @keyup="searchElement">
        <template #prepend>
          <i class="fa fa-search" />
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-table :data="data">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ scope.row.posiblegraduado.first_name }} {{ scope.row.posiblegraduado.last_name}}
      </template>
    </el-table-column>
    <el-table-column label="Correo" prop="email" />
    <el-table-column label="Carnet" prop="carnet" />
    <el-table-column label="Usuario" prop="username" />
    <el-table-column>
      <template #default="scope">
        <el-button type="primary" :disabled="true" @click="showModal(scope.row)">
            Historial preubicación
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="modal" title="Historial de asignación de áreas" width="80%">
  </el-dialog>
</template>
