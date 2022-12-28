<script setup lang="ts">
import { computed, defineEmits, defineProps, useSlots } from 'vue'
import type { JovenFilter } from '~/backed_services/joven.services'

interface Props {
  filter: JovenFilter
  searchable: Boolean
}
const props = withDefaults(defineProps<Props>(), {
  searchable: true,
})
const slots = useSlots()
</script>

<template>
  <el-form inline>
    <slot />
    <el-form-item v-if="searchable">
      <el-input v-model="filter.search" placeholder="Buscar ..." style="max-width: 200px" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('submit')">
        Filtrar
      </el-button>
    </el-form-item>
  </el-form>
</template>
