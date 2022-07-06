<template>
<h2>Configuraciones del Sistema</h2>
</template>

<script setup lang="ts">

import ConfigurationService from "~/services/configuration.services"
import {checkServerError} from "~/helpers/utils"

const router = useRouter()
const configs = await ConfigurationService.listConfigs()
checkServerError(configs)

</script>