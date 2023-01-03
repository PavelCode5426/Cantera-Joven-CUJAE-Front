<script setup lang="ts">
import { useRoute } from 'vue-router'
import CrearEditarPlanFormacionPage from '../components/subpages/CrearEditarPlanFormacionColectivaPage.vue'

const route = useRoute()
const is_review = route.params.revision
</script>

<template>
  <crear-editar-plan-formacion-page />
</template>
