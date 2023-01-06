<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import type { PlantillaAvalModel } from '../../../../../backed_services/models/aval.model'
import AvalPlantillaServices from '../../../../../backed_services/aval.services'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'

interface Props {
  data: PlantillaAvalModel[]
}

const props = defineProps<Props>()

const emit = defineEmits(['item-deleted', 'item-updated'])

const PlantillaServices = AvalPlantillaServices.PlantillaServices

const selectedItem = ref<PlantillaAvalModel | undefined>(undefined)
const showDialog = computed(() => selectedItem.value !== undefined)

async function deleteItem(id: number) {
  try {
    const response = await PlantillaServices.delete_plantilla(id)
    ElMessage.success('Plantilla Eliminada correctamente')
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
  ElNotification.success({ message: 'Plantilla de Aval editada correctamente' })
  emit('item-updated')
}
</script>

<template>
  <el-table :data="data">
    <el-table-column label="Nombre" prop="nombre" />
    <el-table-column align="right">
      <template #default="scope">
        <p-button button-type="warning" button-title="Editar" @click="selectItem(scope.row.id)" />
        <confirm-pop-button
          confirm-button-type="danger"
          button-title="Eliminar"
          button-type="danger"
          title="¿Esta seguro que desea eliminar el elemento?"
          @on-confirm="deleteItem(scope.row.id)"
        />
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="showDialog" title="Editar Plantilla de Aval" destroy-on-close @close="selectedItem = undefined">
    <plantilla-aval-form :plantilla="selectedItem" @cancel="selectedItem = undefined" @success="plantillaUpdated" />
  </el-dialog>
</template>
