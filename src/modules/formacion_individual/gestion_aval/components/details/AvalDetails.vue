<script setup lang="ts">
import { computed, defineProps, watch } from 'vue'
import { ExceptionResponse } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'
import { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import type { JovenModel } from '~/backed_services/models/joven.model'
import AvalPlantillaServices from '~/backed_services/aval.services'

interface Props {
  joven: JovenModel
}
const props = defineProps<Props>()
const aval = ref('')
const isLoading = ref(false)
const userAvalServices = AvalPlantillaServices.UserAvalServices

async function loadAval(joven_id: number) {
  try {
    activateLoading(isLoading)
    aval.value = await userAvalServices.retrieve_aval(joven_id).texto
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

if (props.joven.aval)
  loadAval(props.joven.id)

watch(props, () => {
  loadAval(props.joven.id)
})
</script>

<template>
  <el-row>
    <el-col>
      <el-descriptions title="Informacion del Joven" column="2" border>
        <el-avatar size="large" />
        <el-descriptions-item label="Nombre">
          {{ joven?.first_name }}
        </el-descriptions-item>
        <el-descriptions-item label="Apellidos">
          {{ joven?.last_name }}
        </el-descriptions-item>
        <el-descriptions-item label="Carnet">
          {{ joven?.carnet }}
        </el-descriptions-item>
        <el-descriptions-item label="Area">
          {{ joven?.area.nombre }}
        </el-descriptions-item>
        <el-descriptions-item label="Direccion">
          {{ joven?.direccion }}
        </el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <p v-html="aval" />
    </el-col>
  </el-row>
</template>
