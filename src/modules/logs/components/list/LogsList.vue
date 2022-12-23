<script setup lang="ts">
import { ref } from 'vue'
import usePaginateResponse from '../../../../globals/composables/usePaginateResponse'
import LogService from '~/backed_services/log.services'
import type { PaginateResponse } from '~/globals/config/axios'
import { ExceptionResponse, ServerError } from '~/globals/config/axios'
import isLoading, { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import { actionFlagToColor, actionFlagToString, contentTypeToString } from '~/modules/configuracion/helpers/config.helpers'
import type LogModel from '~/backed_services/models/log.model'

const logs = usePaginateResponse<LogModel>()

async function loadLogs(page = 1) {
  activateLoading(isLoading)
  try {
    const response = await LogService.all_user_logs(page)
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
  <el-table v-loading="isLoading" :data="logs.results">
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
    <el-table-column label="Momento de la accion" prop="action_time" />
  </el-table>
  <paginator :model="logs" @current-change="loadLogs" />
</template>
