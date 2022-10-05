<script setup lang="ts">
import type GraduatedModel from '~/services/models/graduated.model'
import type UserModel from '~/services/models/user.model'
import FormacionServices from '~/services/formacion.services'
import { checkIsAuthenticateAndChangeStorage, checkServerErrorAndMessage } from '~/helpers/utils'
import type AreaModel from '~/services/models/area.model'
import AreaServices from '~/services/area.services'
import AuthStore from '~/modules/authentication/store/auth.store'

// TODO LLEVAR ESTO A UN COMPOSABLE
interface FormProps {
  graduate: GraduatedModel | undefined
  show: boolean
}
const props = withDefaults(defineProps<FormProps>(), {
  graduate: undefined,
  show: false,
})
const emit = defineEmits(['on-success'])
const authStore = AuthStore()

let areaTutorsNotReactive: UserModel[] = []

const areasList = ref([] as AreaModel[])
const areaTutors = ref([] as UserModel[])
const graduateTutors = ref([] as UserModel[])

const selectedTutors = ref([] as number[])
const selectedAreas = ref([] as number[])

const updateAreaTutors = async () => {
  const response = await FormacionServices.tutoriaService.listAreaTutors()

  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    areaTutorsNotReactive = response.data as UserModel[]
    areaTutors.value = areaTutorsNotReactive
  }
}
const updateAreaList = async () => {
  const response = await AreaServices.listAll()
  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response))
    areasList.value = response.data.filter(item => item.id !== authStore.area.id)
}
const updateGraduateTutors = async () => {
  const response = await FormacionServices.tutoriaService.listGraduateTutors(props.graduate.id)

  if (!checkServerErrorAndMessage(response) && checkIsAuthenticateAndChangeStorage(response)) {
    graduateTutors.value = response.data as UserModel[]
    areaTutors.value.push(graduateTutors.value.filter(item => !areaTutors.value.includes(item)))
    graduateTutors.value.forEach(item => selectedTutors.value.push(item.id))
  }
}

const confirmDialog = () => {
  const response = FormacionServices.tutoriaService.assignTutors(props.graduate.id, selectedTutors.value, selectedAreas.value)
  if (!checkServerErrorAndMessage(response))// && checkIsAuthenticateAndChangeStorage(response))
    emit('on-success')
}

async function openDialog() {
  selectedTutors.value = []
  selectedAreas.value = []
  await updateGraduateTutors()
}

updateAreaTutors()
updateAreaList()
</script>

<template>
  <el-dialog
    v-model="show"
    title="Asignar Tutores"
    :show-close="false"
    @open="openDialog()"
  >
    <el-row v-if="graduate">
      <el-col :span="12">
        <p>Nombre: {{ graduate.first_name }}</p>
        <p>Apellidos: {{ graduate.last_name }}</p>
        <p>Correo Electronico: {{ graduate.email }}</p>
      </el-col>
      <el-col :span="12">
        <el-form label-position="top">
          <el-form-item label="Asignar tutores">
            <el-select v-model="selectedTutors" data-test="combobox-select-tutors" placeholder="Seleccione los Tutores" multiple collapse-tags collapse-tags-tooltip>
              <el-option
                v-for="item in areaTutors"
                :key="item.id"
                data-test="combobox-select-tutors-option"
                :label="`${item.first_name} ${item.last_name}`"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Solicitar tutor externo">
            <el-select v-model="selectedAreas" data-test="combobox-select-areas" placeholder="Seleccione las Areas" multiple collapse-tags collapse-tags-tooltip>
              <el-option
                v-for="item in areasList"
                :key="item.id"
                data-test="combobox-select-areas-option"
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
          :button-type="{ 'disabled': !selectedTutors.length, 'btn-info': true }"
          button-title="Confirmar"
          title="¿Esta seguro que desea asignar estos tutores?"
          @on-confirm="confirmDialog()"
        />
      </div>
    </template>
  </el-dialog>
</template>
