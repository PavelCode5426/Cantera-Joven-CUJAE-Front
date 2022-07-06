<template>
  <span v-for="item in items">
    <p class="text-left" :class="customClass">{{item.$message}}</p>
  </span>
</template>
<script setup lang="ts">
import {ErrorObject} from "@vuelidate/core"

interface Props {
  customClass:string | undefined
  items:Array<ErrorObject> | undefined
}

withDefaults(defineProps<Props>(),{
  customClass:'text-danger',
  items: undefined
})

</script>