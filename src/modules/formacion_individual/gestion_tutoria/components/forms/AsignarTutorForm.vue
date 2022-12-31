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

interface Props {
  joven: JovenModel
}
interface Solicitud {
  area: AreaModel
  motivo_solicitud: string
}

const props = defineProps<Props>()
const emit = defineEmits(['cancel', 'success'])

const tutoresArea_int: UserModel[] = []
const tutoresArea = ref<UserModel[]>([])
const selectedTutores = ref([])
const areas = ref<AreaModel[]>([])
const user_area = AuthStore().user?.area

const solicitudes = ref<SolicitudTutorExterno[]>([])

const form = ref({
  selectedTutores,
  solicitudes,
})

const validationRules = {
  selectedTutores: { required },
  solicitudes: {
    $each: helpers.forEach({
      area: { required },
      motivo_solicitud: { required },
    }),
  },
}
const $v = useVuelidate(validationRules, form)
const v = $v.value

async function loadTutores() {
  const all_tutors: UserModel[] = []
  try {
    const filter = new Filter(1, 500)
    let response = await tutoriaServices.all_tutors_in_area(user_area.id, filter)
    all_tutors.push(...response.results)

    while (response.next !== null) {
      all_tutors.push(...response.results)
      filter.page++
      response = await tutoriaServices.all_tutors_in_area(user_area.id, filter)
    }

    tutoresArea.value = all_tutors
    tutoresArea_int.push(...all_tutors)
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
async function loadJovenTutores(joven_id: number) {
  const all_tutors: TutorAsignadoModel[] = []
  try {
    const filter = new TutoriaFilter(1, 500)
    filter.revocation = false
    let response = await tutoriaServices.all_tutores_from_joven(joven_id, filter)
    all_tutors.push(...response.results)

    while (response.next !== null) {
      all_tutors.push(...response.results)
      filter.page++
      response = await tutoriaServices.all_tutores_from_joven(joven_id, filter)
    }

    tutoresArea.value = tutoresArea_int
    all_tutors.forEach((i) => {
      if (!tutoresArea_int.find(item => item.id === i.tutor.id))
        tutoresArea.value.push(i.tutor)
    })

    selectedTutores.value = []
    all_tutors.forEach(item => selectedTutores.value.push(item.tutor.id))
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function submitForm() {
  try {
    const valid = await v.$validate()
    if (valid) {
      const params: AsignarSolicitarTutor = {
        tutores: selectedTutores.value,
        solicitudes: solicitudes.value,
      }

      // solicitudes.value.forEach((item) => {
      //   params.solicitudes.push({
      //     area: item.area.id,
      //     motivo_solicitud: item.motivo_solicitud,
      //   })
      // })

      const response = await tutoriaServices.asignar_tutores(props.joven.id, params)
      ElNotification.success('Tutores asignados correctamente')
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
async function addSolicitud() {
  const valid = await v.solicitudes.$validate() || solicitudes.value.length == 0
  if (valid) {
    solicitudes.value.push({
      area: undefined, motivo_solicitud: '',
    })
  }
}

async function clearForm() {
  selectedTutores.value = []
  solicitudes.value = []
  v.$reset()
}

watch(props, async (newValue) => {
  clearForm()
  await loadJovenTutores(newValue.joven.id)
})

loadAreas()
loadTutores()
loadJovenTutores(props.joven.id)
</script>

<template>
  <el-row justify="space-around">
    <el-col :span="12">
      <aval-accordion-details :joven="joven" />
    </el-col>
    <el-col :span="10">
      <el-form label-position="top">
        <el-form-item label="Seleccione los tutores del joven" required>
          <el-select v-model="$v.selectedTutores.$model" collapse-tags="true" collapse-tags-tooltip="true" aria-modal="false" filterable="true" multiple="true" @blur="$v.selectedTutores.$touch()">
            <el-option v-for="tutor in tutoresArea" :value="tutor.id" :label="`${tutor.first_name} ${tutor.last_name}`" />
          </el-select>
          <template #error>
            <input-error-message :items="$v.selectedTutores.$errors" />
          </template>
        </el-form-item>

        <template v-for="(solicitud, index) in solicitudes">
          <p class="bold">
            Solicitud de tutor externo #{{ index + 1 }}
          </p>
          <el-form-item label="Seleccione el area" required>
            <el-select v-model="solicitud.area" aria-modal="false" filterable="true">
              <el-option v-for="area in areas" :value="area.id" :label="area.nombre" />
            </el-select>
            <template #error>
              <input-error-message :items="$v.solicitudes.$each.$response.$errors[index].area" />
            </template>
          </el-form-item>
          <el-form-item label="Motivo de la solicitud" required>
            <el-input v-model="solicitud.motivo_solicitud" type="textarea" />
            <template #error>
              <input-error-message :items="$v.solicitudes.$each.$response.$errors[index].motivo_solicitud" />
            </template>
          </el-form-item>
        </template>

        <el-form-item>
          <el-button @click="addSolicitud">
            Solicitar tutor externo
          </el-button>
          <el-button v-if="form.solicitudes.length" type="danger" @click="form.solicitudes.pop()">
            Eliminar solicitud
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <el-divider />
  <el-row justify="end">
    <el-col :span="6">
      <el-button @click="submitForm">
        Guardar Cambios
      </el-button>
      <el-button @click="emit('cancel')">
        Cancelar
      </el-button>
    </el-col>
  </el-row>
</template>
