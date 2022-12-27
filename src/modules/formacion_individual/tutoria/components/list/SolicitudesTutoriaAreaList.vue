<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { SolicitudTutorModel } from '../../../../../backed_services/models/tutorial.model'
import { EstudianteModel } from '~/backed_services/models/joven.model'

interface Props {
  data: SolicitudTutorModel[]
}

const props = defineProps<Props>()
const emit = defineEmits(['reload'])
const selectedSolicitud = ref<SolicitudTutorModel | undefined>(undefined)
const modal = ref(false)

function showModal(solicitud: SolicitudTutorModel) {
  selectedSolicitud.value = solicitud
  modal.value = true
}
</script>

<template>
  <el-table :data="data">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ scope.row.joven.first_name }} {{ scope.row.joven.last_name }}
      </template>
    </el-table-column>
    <el-table-column label="Correo" prop="joven.email" />
    <el-table-column label="Area Solicitada" prop="area.nombre" />
    <el-table-column label="Area Recibida" prop="joven.area.nombre" />
    <el-table-column>
      <template #default="scope">
        <el-button v-if="scope.row.respondida == null">
          Response Solicitud
        </el-button>
        <el-button v-else>
          Detalles
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="modal" title="Responder solicitud de tutoria" width="80%" />
</template>
