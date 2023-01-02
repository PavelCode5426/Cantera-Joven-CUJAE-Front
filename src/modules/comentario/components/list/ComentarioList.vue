<script setup lang="ts">
import { computed, defineEmits, defineProps, watch } from 'vue'
import type ComentarioModel from '../../../../backed_services/models/comentario.model'

interface Prop {
  data: ComentarioModel[]
  noMore: boolean
  isLoading: boolean
}

const props = defineProps<Prop>()
const disabled = computed(() => props.noMore || props.isLoading)
</script>

<template>
  <el-scrollbar :infinite-scroll-disabled="disabled" max-height="300px" tag="ul" view-class="comments-list">
    <li v-for="comentario in data">
      <comentario-item :data="comentario" />
    </li>
    <li v-if="isLoading" class="text-center">
      <loading text-class="text-black" />
    </li>
    <li v-if="noMore" class="text-center">
      No existen mas comentarios
    </li>
  </el-scrollbar>
</template>
