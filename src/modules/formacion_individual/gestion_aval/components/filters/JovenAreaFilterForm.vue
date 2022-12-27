<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue'
import type AreaModel from '../../../../../backed_services/models/area.model'
import AreaService from '../../../../../backed_services/area.services'
import { ExceptionResponse } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import type { JovenFilter } from '~/backed_services/joven.services'

interface Props {
  filter: JovenFilter
  area: AreaModel
}
const props = defineProps<Props>()
const areas = ref<AreaModel[]>([])

async function loadAreas() {
  try {
    const response = await AreaService.all_areas()
    areas.value = response.results
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
loadAreas()
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-select v-model="area.id" placeholder="Filtrar por area">
        <el-option v-for="item in areas" :key="item.id" :value="item.id" :label="item.nombre" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filter.has_aval" placeholder="Filtrar por aval" clearable="true">
        <el-option :value="false" label="Sin aval" />
        <el-option :value="true" label="Con aval" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filter.has_plan" placeholder="Filtrar por plan" clearable="true">
        <el-option :value="false" label="Sin plan" />
        <el-option :value="true" label="Con plan" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select v-model="filter.has_tutor" placeholder="Filtrar por tutores" clearable="true">
        <el-option :value="false" label="Sin tutor" />
        <el-option :value="true" label="Con tutor" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="filter.search" placeholder="Buscar joven" style="max-width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit')">
        Filtrar
      </el-button>
    </el-form-item>
  </el-form>
</template>
