<template>
<h2>Configuraciones del Sistema</h2>
</template>

<script setup lang="ts">

import ConfigurationService from "~/services/configuration.services"
import {checkServerErrorAndRedirect} from "~/helpers/utils"

const router = useRouter()
const configs = await ConfigurationService.listConfigs()
checkServerErrorAndRedirect(configs)

</script>