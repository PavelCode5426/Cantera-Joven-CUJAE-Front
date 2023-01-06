<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import gestionarAreaServices from '~/backed_services/gestionar_area.services'
import {ExceptionResponse, ServerError} from '~/globals/config/axios'
import AreaModel from "../../../../backed_services/models/area.model";
import {useRoute} from "vue-router";
import {ElNotification} from "element-plus";
import UbicacionLaboralModel, {UbicadosAreaModel} from "../../../../backed_services/models/ubicacion_laboral.model";
import AreaService from "../../../../backed_services/area.services";
import {PosibleGraduadoModel} from "../../../../backed_services/models/posible_graduado.model";
import FColectivaServices from "../../../../backed_services/formacion_colectiva.services";

interface Preubicacion {
  area: number
  ubicados: number[]
}

const posibles_graduados_init = ref([])
const areas = ref<AreaModel[]>([])
const selectedArea = ref<number>()
const route = useRoute()

const ubicaciones = ref<Preubicacion[]>([])

const preubicados = ref<UbicadosAreaModel[]>([])

async function loadDataPG() {
  try {
    const response = await gestionarAreaServices.all_pgraduados()
    posibles_graduados_init.value = response
  }
  catch (error: ExceptionResponse) {
    if (error.httpCode === 404)
      ElNotification.error('Error')
    else ElNotification.error(error.detail)
  }
}
async function loadAreas() {
  try {
    const response = await AreaService.all_areas()
    areas.value = response.results
    if (areas.value.length)
    selectedArea.value = areas.value[0].id
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function loadAsignados() {
  let preubicados: UbicadosAreaModel[] = []
  try {

    preubicados = await gestionarAreaServices.
    ubicaciones.value = []

    preubicados.forEach(item=>{
      const ubicacion:Preubicacion = {
        area: item.area.id,
        ubicados: item.ubicados.map((value)=>{
          return value.id
        })
      }
      ubicaciones.value.push(ubicacion)
    })
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
const noUbicados = ref([])

watch(ubicaciones,(newValue)=>{

  let noubic = [...posibles_graduados_init.value]

  newValue.forEach((item)=>{
    item.ubicados.forEach(id=>{
      noubic = noubic.filter((item2)=>item2.id!== id)
    })
  })

  noUbicados.value = noubic

})

const ubicadosArea = computed(()=>{
  return ubicaciones.value.find(ubi=>ubi.area === selectedArea.value)?.ubicados
})
const data = computed(()=>{
  const list = []

  noUbicados.value.forEach(item=>list.push({
    label: item.first_name,
    value:item.id
  }))

  return list
})

function onChange(values){
  ubicaciones.value.find(ubi=>ubi.area === selectedArea.value).ubicados = values
}

async function create_ubicacion_laboral(ubicaciones: Preubicacion) {
  try {
    await gestionarAreaServices.create_ubicacion_laboral(ubicaciones)
    ElNotification.success('Preubicacion Laboral relizada exitosamente')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

loadDataPG()
loadAreas()
loadAsignados()
</script>

<template>
  <h3>Aignación de posibles graduados a áreas</h3>
  <el-select v-model="selectedArea" placeholder="Filtrar por area">
    <el-option v-for="item in areas" :key="item.id" :value="item.id" :label="item.nombre" />
  </el-select>

  <el-transfer
      v-model="ubicadosArea"
      filterable
      @change="onChange"
      :filter-method="filterMethod"
      filter-placeholder="Posible graduado"
      :data="data"
  >
  </el-transfer>
  <el-table-column>
    <el-button @click="create_ubicacion_laboral(ubicaciones)">
      Guardar Asignacion
    </el-button>
  </el-table-column>
</template>>

