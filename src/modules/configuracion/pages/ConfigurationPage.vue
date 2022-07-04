<template>
<h2>Configuraciones del Sistema</h2>
</template>

<script setup lang="ts">

import ConfigurationService from "~/services/configuration.services";
import {ServerError} from "~/globals/config/axios";
import {ElMessage} from "element-plus";

const router = useRouter()
const configs = await ConfigurationService.listConfigs()
if (configs instanceof ServerError)
  router.push({name:'server-error-page',query:{message:configs.error.message}})

console.log(configs)


</script>