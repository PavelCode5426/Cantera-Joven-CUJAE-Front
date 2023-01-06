<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'

interface Props {
  customClass: string | undefined
  items: Array<ErrorObject> | undefined
}

withDefaults(defineProps<Props>(), {
  customClass: 'text-danger',
  items: undefined,

})
</script>

<template>
  <div v-for="item in items" class="el-form-item__error">
    {{ item.$message }}
  </div>

  <span v-for="item in items">
    <span class="text-left" :class="customClass">{{ item.$message }}</span>
  </span>
</template>

<style scoped>
</style>
