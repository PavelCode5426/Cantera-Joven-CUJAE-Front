<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { SolicitudTutorModel } from '../../../../../backed_services/models/tutorial.model'
import AuthStore from '../../../../authentication/store/auth.store'

interface Props {
  data: SolicitudTutorModel[]
}

const props = defineProps<Props>()
const emit = defineEmits(['reload'])
const selectedSolicitud = ref<SolicitudTutorModel | undefined>(undefined)
const current_area = AuthStore().user?.area
const modalResponder = ref(false)
const modalDetails = ref(false)

function showModalResponder(solicitud: SolicitudTutorModel) {
  selectedSolicitud.value = solicitud
  modalResponder.value = true
}
function showModalDetalle(solicitud: SolicitudTutorModel) {
  selectedSolicitud.value = solicitud
  modalDetails.value = true
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
        <el-button v-if="scope.row.respondida == null && scope.row.area.id === current_area.id" @click="showModalResponder(scope.row)">
          Responder Solicitud
        </el-button>
        <el-button v-else @click="showModalDetalle(scope.row)">
          Detalles
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="modalResponder" title="Responder solicitud de tutoria" width="80%" @cancel="modalResponder = false">
    <asignar-tutor-externo-form :solicitud="selectedSolicitud" />
  </el-dialog>
  <el-dialog v-model="modalDetails" width="80%" @cancel="modalDetails = false">
    <solicitud-tutor-details title="Informacion de la solicitud" column="2" :solicitud="selectedSolicitud" />
    <joven-details title="Informacion del Joven" column="2" border :joven="selectedSolicitud.joven" />
    <aval-details :joven="selectedSolicitud.joven" />
  </el-dialog>
</template>
