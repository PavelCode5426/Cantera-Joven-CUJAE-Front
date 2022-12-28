<script setup lang="ts">
import { computed, defineProps, ref, watch } from 'vue'
import { helpers, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ElNotification } from 'element-plus'
import type { JovenModel } from '../../../../../backed_services/models/joven.model'
import type UserModel from '../../../../../backed_services/models/user.model'
import type AreaModel from '../../../../../backed_services/models/area.model'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import AuthStore from '../../../../authentication/store/auth.store'
import type { AsignarSolicitarTutor, SolicitudTutorExterno } from '../../../../../backed_services/tutoria.services'
import tutoriaServices, { TutoriaFilter } from '../../../../../backed_services/tutoria.services'
import { Filter } from '../../../../../backed_services/service'
import type { TutorAsignadoModel } from '../../../../../backed_services/models/tutorial.model'
import InputErrorMessage from '../../../../../globals/components/Error/InputErrorMessage.vue'
import AreaService from '../../../../../backed_services/area.services'
import {PosibleGraduadoModel} from '../../../../../backed_services/models/posible_graduado.model'
import UbicacionLaboralModel from '../../../../../backed_services/models/ubicacion_laboral.model'
import gestionarAreaServices from '../../../../../backed_services/gestionar_area.services'

interface Preubicacion {
  posibleraduado: PosibleGraduadoModel
  area: AreaModel
}

const props = defineProps<Props>()
const emit = defineEmits(['cancel', 'success'])

const posiblesgraduados: PosibleGraduadoModel[] = []
const selectedPosiblesGraduados = ref([])
const areas = ref<AreaModel[]>([])
const user_area = AuthStore().user?.area

const preubicaciones = ref<UbicacionLaboralModel[]>([])

const form = ref({
  selectedPosiblesGraduados,
  preubicaciones,
})

const validationRules = {
  selectedPosiblesGraduados: { required },
  preubicaciones: { required },
}
const $v = useVuelidate(validationRules, form)
const v = $v.value

async function loadPosiblesGraduados(id) {
  try {
    const get_pgraduados = await gestionarAreaServices.get_pgraduados()
    const filter = new PreubicacionFilter(1, 500)
    filter.is_preubicado = true
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function loadAreas() {
  try {
    const all_areas = await AreaService.all_areas()
    areas.value = all_areas.results.filter(i => i.id !== user_area.id)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

async function submitForm() {                 //no está terminado
  try {
    const valid = await v.$validate()
    if (valid) {
      const params:  = {
        posiblesgraduados: selectedPosiblesGraduados.value,
        preubicaciones: preubicaciones.value,
      }

      const response = await gestionarAreaServices.create_ubicacion_laboral(params)
      ElNotification.success('Áreas preasignadas correctamentes')
      emit('success')
      clearForm()
    }
    else { ElNotification.error('Formulario incompleto') }
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function clearForm() {
  selectedPosiblesGraduados.value = []
  preubicaciones.value = []
  v.$reset()
}

watch(props, async (newValue) => {
  clearForm()
  await loadPosiblesGraduados(newValue.posiblegraduado.id)
})

loadAreas()
loadPosiblesGraduados()

</script>

<template>
  <el-row justify="space-around">
    <el-col :span="10">
      <el-form label-position="top">
        <el-form-item label="Seleccione los posibles graduados" required>
          <el-select v-model="$v.selectedPosiblesGraduados.$model" collapse-tags="true" collapse-tags-tooltip="true" aria-modal="false" filterable="true" multiple="true" @blur="$v.selectedPosiblesGraduados.$touch()">
            <el-option v-for="posiblegraduado in posiblegraduadoArea" :value="posiblegraduado.id" :label="`${posiblegraduado.first_name} ${posiblegraduado.last_name}`" />
          </el-select>
          <template #error>
            <input-error-message :items="$v.selectedPosiblesGraduados.$errors" />
          </template>
        </el-form-item>

        <template v-for="(preubicacion, index) in preubicaciones">
          <el-form-item label="Seleccione el área" required>
            <el-select v-model="preubicaciones.area" aria-modal="false" filterable="true">
              <el-option v-for="area in areas" :value="area.id" :label="area.nombre" />
            </el-select>
            <template #error>
              <input-error-message :items="$v.preubicaciones.$each.$response.$errors[index].area" />
            </template>
          </el-form-item>
        </template>
      </el-form>
    </el-col>
  </el-row>

  <el-divider />
  <el-row justify="end">
    <el-col :span="5">
      <el-button @click="submitForm">
        Guardar Cambios
      </el-button>
      <el-button @click="emit('cancel')">
        Cancelar
      </el-button>
    </el-col>
  </el-row>
</template>
