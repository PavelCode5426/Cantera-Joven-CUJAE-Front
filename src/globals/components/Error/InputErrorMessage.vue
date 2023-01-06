<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'

interface Props {
  items: Array<ErrorObject> | undefined
}

withDefaults(defineProps<Props>(), {
  items: undefined,
})
</script>

<template>
  <div v-for="item in items" class="el-form-item__error">
    {{ item.$message }}
  </div>
</template>

<style scoped>
</style>
