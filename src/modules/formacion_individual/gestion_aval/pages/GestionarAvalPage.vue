<script setup lang="ts">
import { ref } from 'vue'
import { is_director_recursos_humanos } from '~/globals/permissions'
const is_drh = ref(is_director_recursos_humanos())
</script>

<template>
  <universidad-aval-page v-if="is_director_recursos_humanos" />
  <area-aval-page v-else />
</template>
