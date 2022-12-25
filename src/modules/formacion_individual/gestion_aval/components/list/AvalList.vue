<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { ElNotification } from 'element-plus'
import type { JovenModel } from '../../../../../backed_services/models/joven.model'

interface Props {
  data: JovenModel[]
}

const props = defineProps<Props>()
const emit = defineEmits(['reload'])
const selectedUser = ref<JovenModel | undefined>(undefined)
const showModal = ref(false)
const modalTitle = ref('')

function showCreateAval(user: JovenModel) {
  modalTitle.value = 'Crear nuevo aval'
  selectedUser.value = user
  showModal.value = true
}
function showEditAval(user: JovenModel) {
  modalTitle.value = 'Editar aval'
  selectedUser.value = user
  showModal.value = true
}

function updateOrCreateAval(update: boolean) {
  if (update)
    ElNotification.success('Aval actualizado correctamente')
  else
    ElNotification.success('Aval creado correctamente')

  showModal.value = false
  emit('reload')
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
        <el-button v-if="!scope.row.aval" type="primary" @click="showCreateAval(scope.row)">
          Crear Avales
        </el-button>
        <el-button v-else type="warning" @click="showEditAval(scope.row)">
          Editar Avales
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="showModal" :title="modalTitle">
    <aval-form
      :joven="selectedUser"
      @updated="updateOrCreateAval(true)"
      @created="updateOrCreateAval(false)"
      @cancel="showModal = false"
    />
  </el-dialog>
</template>
