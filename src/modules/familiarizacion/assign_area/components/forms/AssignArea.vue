<script setup lang="ts">
import GraduatedModel from '~/services/models/graduated.model'
import UserModel from '~/services/models/user.model'
import FormacionServices from '~/services/formacion.services'
import { checkIsAuthenticateAndChangeStorage, checkServerErrorAndMessage } from '~/helpers/utils'
import type AreaModel from '~/services/models/area.model'
import AreaServices from '~/services/area.services'
import AuthStore from '~/modules/authentication/store/auth.store'
import type PossiblegraduateModel from '~/services/models/possiblegraduate.model'
import familiarizacionServices from '~/services/familiarizacion.services'

// TODO LLEVAR ESTO A UN COMPOSABLE
interface FormProps {
  possiblegraduate: PossiblegraduateModel | undefined
  show: boolean
}
const props = withDefaults(defineProps<FormProps>(), {
  possiblegraduate: undefined,
  show: false,
})
const emit = defineEmits(['on-success'])
const authStore = AuthStore()

const areasList = ref([] as AreaModel[])
const selectedArea = ref([] as number[])

const updateAreaList = async () => {
  const response = await AreaServices.listAll()
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response))
    areasList.value = response.data.filter(item => item.id !== authStore.area.id)
}

const confirmDialog = () => {
  const response = familiarizacionServices.ListarPreubicacionLaboralAdelantada()
  if (!checkServerErrorAndMessage(response))// && checkIsAuthenticateAndChangeStorage(response))
    emit('on-success')
}

async function openDialog() {
  selectedAreas.value = []
}

updateAreaList()
</script>

<template>
  <el-dialog
    v-model="show"
    data-test="modal-assing-area-form"
    title="Asignar Area"
    :show-close="false"
    @open="openDialog()"
  >
    <el-row v-if="possiblegraduate">
      <el-col :span="12">
        <p>Nombre: {{ possiblegraduate.first_name }}</p>
        <p>Apellidos: {{ possiblegraduate.last_name }}</p>
        <p>Correo Electronico: {{ possiblegraduate.email }}</p>
      </el-col>
      <el-col :span="12">
        <el-form label-position="top">
          <el-form-item label="Asignar Area">
            <el-select v-model="selectedAreas" placeholder="Seleccione las Areas" multiple collapse-tags collapse-tags-tooltip>
              <el-option
                v-for="item in areasList"
                :key="item.id"
                :label="item.nombre"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template #footer>
      <div class="modal-footer">
        <simple-button
          button-title="Cancelar"
          button-type="btn-default"
          @click="emit('closed')"
        />
        <!--    TODO SUSTITUIR POR UN VUELIDATE    -->
        <confirm-pop-button
          :button-type="{ 'disabled': !selectedArea.length, 'btn-info': true }"
          button-title="Confirmar"
          title="¿Esta seguro que desea asignar estas areas?"
          @on-confirm="confirmDialog()"
        />
      </div>
    </template>
  </el-dialog>
</template>
