<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { GraduadoModel, JovenModel } from '~/backed_services/models/joven.model'
import { EstudianteModel } from '~/backed_services/models/joven.model'

interface Props {
  data: JovenModel[]
}

const props = defineProps<Props>()
const emit = defineEmits(['reload'])
const selectedUser = ref<JovenModel | undefined>(undefined)
const modal = ref(false)

function showModal(user: JovenModel) {
  selectedUser.value = user
  modal.value = true
}
function canManageTutor(joven: JovenModel) {
  // TODO REVISAR ESTO
  return joven.aval && (!(joven instanceof EstudianteModel) && joven.aval)
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
    <el-table-column>
      <template #default="scope">
        <el-tooltip v-if="!canManageTutor(scope.row)" effect="dark" content="No puede asignar tutor a jovenes sin aval">
          <el-button type="primary" :disabled="true" @click="showModal(scope.row)">
            Gestionar Tutores
          </el-button>
        </el-tooltip>

        <el-button v-else type="primary" @click="showModal(scope.row)">
          Gestionar Tutores
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="modal" title="Gestionar tutores del joven" width="80%">
    <asignar-tutor-form :joven="selectedUser" @cancel="modal = false" @success="modal = false" />
  </el-dialog>
</template>
