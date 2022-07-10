<template>
  <el-table :data="logs">
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
</template>
<script setup lang="ts">
import isloadingTable from "~/globals/composables/useLoading";
import LogServices from "~/services/log.services";
import {checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect} from "~/helpers/utils";
import {LogModel} from "~/services/models/log.model"
import {actionFlagToString,actionFlagToColor,contentTypeToString} from "~/modules/configuracion/helpers/config.helpers";


isloadingTable.value = true
const logs = ref<LogModel[]>([])

async function updateTable(){
  const response = await LogServices.listLogs()
  if (!checkServerErrorAndRedirect(response) && checkIsAuthenticateAndRedirect(response)){
    logs.value = response.data
    console.log(response)
  }
}

updateTable()
</script>