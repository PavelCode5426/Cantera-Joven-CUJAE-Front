<script setup lang="ts">
import { ref } from 'vue'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import { Filter } from '../../../../backed_services/service'
import LogService from '~/backed_services/log.services'
import { ExceptionResponse, ServerError } from '~/globals/config/axios'
import isLoading, { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect, getRealativeTime } from '~/helpers/utils'
import { actionFlagToColor, actionFlagToString, contentTypeToString } from '~/modules/configuracion/helpers/config.helpers'
import type LogModel from '~/backed_services/models/log.model'

const logs = usePaginateResponse<LogModel>()

async function loadLogs(page = 1) {
  activateLoading(isLoading)
  try {
    const response = await LogService.all_user_logs(new Filter(page))
    logs.value = response
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

loadLogs()
</script>

<template>
  <el-table v-loading="isLoading" :data="logs.results" max-height="500">
    <el-table-column label="Accion">
      <template #default="scope">
        <el-tag :type="actionFlagToColor(scope.row.action_flag)">
          {{ actionFlagToString(scope.row.action_flag) }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Entidad">
      <template #default="scope">
        {{ contentTypeToString(scope.row.content_type) }}
      </template>
    </el-table-column>
    <el-table-column label="Momento de la accion">
      <template #default="scope">
        {{ getRealativeTime(scope.row.action_time) }}
      </template>
    </el-table-column>
  </el-table>
  <paginator :model="logs" @current-change="loadLogs" />
</template>
