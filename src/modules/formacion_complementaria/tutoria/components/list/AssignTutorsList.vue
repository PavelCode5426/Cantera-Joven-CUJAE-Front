<script setup lang="ts">
import isLoadingTable, { toogleLoadingDecorator } from '~/globals/composables/useLoading'
import {
  checkIsAuthenticateAndChangeStorage,
  checkIsAuthenticateAndRedirect, checkServerErrorAndMessage,
  checkServerErrorAndRedirect,
} from '~/helpers/utils'
import FormacionServices from '~/services/formacion.services'
import type GraduatedModel from '~/services/models/graduated.model'
import { newArrayRef, registerArrayRefs } from '~/globals/composables/useRegisterArrayRef'

isLoadingTable.value = true
const graduatesWithoutTutors = ref([] as GraduatedModel[])
const selectedGraduate = ref<GraduatedModel | undefined>()
const assignButtonsRef = newArrayRef()
const show = ref(false)

let updateTable = async () => {
  const response = await FormacionServices.tutoriaService.listAreaGraduatesWithoutTutor()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response))
    graduatesWithoutTutors.value = response.data as GraduatedModel[]
}
updateTable = toogleLoadingDecorator(updateTable, isLoadingTable)

async function onClickAssignButton(tableRow: any) {
  const btnIndex = tableRow.$index
  const assingButtonRef = assignButtonsRef.value[btnIndex]
  selectedGraduate.value = tableRow.row
  assingButtonRef.activateLocalLoading()
  show.value = true
  assingButtonRef.desactivateLocalLoading()
}
function onCloseAssingTutorForm() {
  selectedGraduate.value = undefined
  show.value = false
}
async function onSuccessAssingTutorForm() {
  await updateTable()
  show.value = false
  ElMessage.success('Tutores asignados correctamente')
}

updateTable()
</script>

<template>
  <el-table :data="graduatesWithoutTutors">
    <el-table-column label="Nombre y Apellido">
      <template #default="scope">
        {{ `${scope.row.first_name} ${scope.row.last_name}` }}
      </template>
    </el-table-column>
    <el-table-column label="Correo Electronico" prop="email" />
    <el-table-column label="Direccion" prop="direccion" />
    <el-table-column label="Externo">
      <template #default="scope">
        <i
          :class="{
            'fa fa-check-circle text-success': scope.row.esExterno,
            'fa fa-circle-o text-danger': !scope.row.esExterno,
          }"
        />
      </template>
    </el-table-column>
    <el-table-column label="Nivel Superior">
      <template #default="scope">
        <i
          :class="{
            'fa fa-check-circle text-success': scope.row.esNivelSuperior,
            'fa fa-circle-o text-danger': !scope.row.esNivelSuperior,
          }"
        />
      </template>
    </el-table-column>
    <el-table-column label="Aval">
      <template #default="scope">
        <el-tag v-if="scope.row.aval" type="success">
          Aval Listo
        </el-tag>
        <el-tag v-else type="danger">
          Sin Aval
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <simple-button
          :ref="registerArrayRefs(assignButtonsRef)"
          button-title="Asignar Tutores"
          data-test="btn-assing-tutor"
          :class="{ disabled: !scope.row.aval }"
          button-icon="entypo-plus"
          @click="onClickAssignButton(scope)"
        />
      </template>
    </el-table-column>
  </el-table>

  <assign-tutor-form
    :graduate="selectedGraduate"
    :show="show"
    @closed="onCloseAssingTutorForm()"
    @on-success="onSuccessAssingTutorForm"
  />
</template>
