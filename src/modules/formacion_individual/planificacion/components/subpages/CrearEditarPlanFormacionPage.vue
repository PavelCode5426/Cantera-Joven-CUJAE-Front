<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ExceptionResponse } from '../../../../../globals/config/axios'
import formacionIndividualStore from '../../store/planificacion_individual.store'
import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import { is_jefe_area, is_tutor } from '../../../../../globals/permissions'
import FirmarPlanFormacionForm from '../forms/FirmarPlanFormacionForm.vue'
import FIndivServices from '~/backed_services/formacion_individual.services'

const route = useRoute()
const plan_formacion_id = route.params.id

const formacionStore = formacionIndividualStore()
const { plan, etapas, dimensiones } = storeToRefs(formacionStore)

const activeTab = ref<string>('1')

async function loadPlanFormacion(plan_id: number) {
  try {
    const planFormacion = await FIndivServices.retrieve_plan_formacion(plan_id)
    const etapasFormacion = await FIndivServices.all_etapas_formacion_from_plan(planFormacion.id)
    const dimensionesFormacion = await FIndivServices.all_dimensiones()

    plan.value = planFormacion
    etapas.value = etapasFormacion
    dimensiones.value = dimensionesFormacion

    try {
      activeTab.value = etapas.find(i => i.evaluacion != null).numero
    }
    catch (error) {
      activeTab.value = '1'
    }
  }
  catch (error: ServerError | ExceptionResponse) {
    console.log(error)
    ElNotification.error(error.detail)
  }
}
async function changeStatusHandler(value) {
  try {
    if (value === EstadoPlanFormacion.desarrollo || value === EstadoPlanFormacion.pendiente) {
      const response = await FIndivServices.change_status_plan_formacion(plan_formacion_id, value)
      plan.value.estado = value
      ElNotification.success('Estado cambiado correctamente')
    }
  }
  catch (error: ServerError | ExceptionResponse) {
    alert(error.httpCode)
    alert(error)
    alert(error.detail)
  }
}

const can_change_status = computed(() => {
  return is_tutor() && plan.value?.estado !== EstadoPlanFormacion.aprobado
})
const can_export = computed(() => {
  return plan.value?.estado === EstadoPlanFormacion.pendiente || plan.value?.estado === EstadoPlanFormacion.aprobado
})

loadPlanFormacion(plan_formacion_id)
onMounted(() => loadPlanFormacion(route?.params?.id))
</script>

<template>
  <el-row>
    <el-col :span="16">
      <h3>Plan de Formacion Individual</h3>
    </el-col>
    <el-col :span="8">
      <el-row justify="space-evenly">
        <export-plan-formacion v-if="can_export" :plan="plan" />
        <cambiar-estado-plan-form v-if="can_change_status" :estado="plan?.estado" @change="changeStatusHandler" />
        <firmar-plan-formacion-form v-if="is_jefe_area" :plan="plan" />
      </el-row>
    </el-col>
  </el-row>

  <el-row>
    <plan-formacion-detail style="width: 100%;" border colums="1" :plan="plan" />
  </el-row>

  <el-tabs v-if="etapas.length" v-model="activeTab">
    <el-tab-pane v-for="etapa in etapas" :key="etapa.id" :label="`Etapa #${etapa.numero}`" :name="`${etapa.numero}`">
      <etapa-formacion-item :etapa="etapa" />
      <el-divider />
      <actividad-formacion-list :etapa="etapa" />
    </el-tab-pane>
  </el-tabs>
</template>
