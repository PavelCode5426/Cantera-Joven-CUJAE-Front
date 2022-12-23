<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { PlantillaAvalModel } from '~/backed_services/models/aval.model'

interface Props {
  plantilla: PlantillaAvalModel | undefined
}
const props = defineProps<Props>()

const showModal = computed(() => props.plantilla !== undefined)
</script>

<template>
  <el-dialog v-model="showModal">
    <h3>{{ plantilla?.nombre }}</h3>
    <hr>
    <p v-html="props.plantilla?.texto" />
  </el-dialog>
</template>
