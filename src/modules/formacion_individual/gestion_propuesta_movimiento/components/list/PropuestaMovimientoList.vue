<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import type { PlantillaAvalModel } from '../../../../../backed_services/models/aval.model'
import AvalPlantillaServices from '../../../../../backed_services/aval.services'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import type { PropuestaMovimientoModel } from '../../../../../backed_services/models/formacion_individual.model'
import FIndivServices from '../../../../../backed_services/formacion_individual.services'
import PropuestaMovimientoForm from '../forms/PropuestaMovimientoForm.vue'

interface Props {
  data: PropuestaMovimientoModel[]
}

const props = defineProps<Props>()

const emit = defineEmits(['item-deleted', 'item-updated'])

const selectedItem = ref<PropuestaMovimientoModel | undefined>(undefined)
const showDialog = computed(() => selectedItem.value !== undefined)

async function deleteItem(id: number) {
  try {
    const response = await FIndivServices.delete_propuestas_movimiento(id)
    ElNotification.success('Propuesta eliminada correctamante')
    emit('item-deleted')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function selectItem(id: number) {
  selectedItem.value = props.data.find(i => i.id === id)
}

async function itemUpdated() {
  selectedItem.value = undefined
  ElNotification.success({ message: 'Propuesta de movimiento editada correctamente' })
  emit('item-updated')
}
</script>

<template>
  <el-table :data="data">
    <el-table-column label="Nombre" prop="nombre" />
    <el-table-column align="right">
      <template #default="{ row }">
        <template v-if="!row.nombre.toLowerCase().startsWith('prorroga')">
          <p-button button-type="warning" button-title="Editar" @click="selectItem(row.id)" />
          <confirm-pop-button
            confirm-button-type="danger"
            button-title="Eliminar"
            button-type="danger"
            title="¿Esta seguro que desea eliminar el elemento?"
            @on-confirm="deleteItem(row.id)"
          />
        </template>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="showDialog" title="Editar Plantilla de Aval" @close="selectedItem = undefined">
    <propuesta-movimiento-form :propuesta="selectedItem" @cancel="selectedItem = undefined" @success="itemUpdated" />
  </el-dialog>
</template>
