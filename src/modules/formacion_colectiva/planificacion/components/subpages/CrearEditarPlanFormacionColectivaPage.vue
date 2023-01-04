<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ExceptionResponse } from '../../../../../globals/config/axios'

import { EstadoPlanFormacion } from '../../../../../backed_services/models/formacion_individual.model'
import { is_jefe_area, is_director_recursos_humanos, is_vicerrector } from '../../../../../globals/permissions'
import FirmarPlanFormacionForm from '../forms/FirmarPlanFormacionColectivaForm.vue'
import FColectivaServices from '../../../../backed_services/formacion_colectiva.services'
import formacionColectivaStore from '../../store/planificacion_colectiva.store'
import { EstadoPlanFormacionColectiva } from '../../../../../backed_services/models/formacion_colectiva.model'
import ExportPlanFormacionColectiva from '../items/ExportPlanFormacionColectiva.vue'
import CambiarEstadoPlanColectivoForm from '../forms/CambiarEstadoPlanColectivoForm.vue'
import FirmarPlanFormacionColectivoForm from '../forms/FirmarPlanFormacionColectivaForm.vue'
import PlanFormacionColectivoDetail from '../details/PlanFormacionColectivoDetail.vue'

const route = useRoute()
const plan_formacion_id = route.params.id

const formacionStore = formacionColectivaStore()
const { plan, etapas } = storeToRefs(formacionStore)

const activeTab = ref<string>('1')

async function loadPlanFormacionColetiva(plan_id: number) {
  try {
    const planFormacion = await FColectivaServices.retrieve_plan_formacion_colectiva(plan_id)
    const etapasFormacion = await FColectivaServices.all_etapas_formacion_from_plan(planFormacion.id)

    plan.value = planFormacion
    etapas.value = etapasFormacion

    try {
      activeTab.value = etapas.numero
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
    if (value === EstadoPlanFormacionColectiva.desarrollo || value === EstadoPlanFormacionColectiva.pendiente) {
      const response = await FColectivaServices.change_status_plan_formacion(plan_formacion_id, value)
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
  return is_director_recursos_humanos() && plan.value?.estado !== EstadoPlanFormacionColectiva.aprobado
})
const can_export = computed(() => {
  return plan.value?.estado === EstadoPlanFormacionColectiva.pendiente || plan.value?.estado === EstadoPlanFormacion.aprobado
})

loadPlanFormacionColetiva(plan_formacion_id)
onMounted(() => loadPlanFormacionColetiva(route?.params?.id))
</script>

<template>
  <el-space style="width: 100%" fill direction="vertical">
    <el-row>
      <el-col :span="16">
        <h3>Plan de Formación Colectiva</h3>
      </el-col>
      <el-col :span="8">
        <el-row justify="space-evenly">
          <export-plan-formacion-colectiva v-if="can_export" :plan="plan" />
          <cambiar-estado-plan-colectivo-form v-if="can_change_status" :estado="plan?.estado" @change="changeStatusHandler" />
          <firmar-plan-formacion-colectivo-form v-if="is_vicerrector" :plan="plan" />
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <plan-formacion-colectivo-detail style="width: 100%;" border colums="1" :plan="plan" />
    </el-row>

    <el-tabs v-if="etapas.length" v-model="activeTab">
      <el-tab-pane v-for="etapa in etapas" :key="etapa.id" :label="`Etapa #${etapa.numero}`" :name="`${etapa.numero}`">
        <etapa-formacion-item :etapa="etapa" />
        <el-divider />
        <actividad-formacion-list :etapa="etapa" />
      </el-tab-pane>
      <el-tab-pane v-if="plan.estado !== EstadoPlanFormacion.aprobado" label="Comentarios" name="comentarios">
        <plan-formacion-comentarios :plan="plan" />
      </el-tab-pane>
    </el-tabs>
  </el-space>
</template>
