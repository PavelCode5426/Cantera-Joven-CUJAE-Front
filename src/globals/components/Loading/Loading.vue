<template>
  <i class="fa fa-spinner rotation-animation" :class="textClass" :style="{'font-size':fontSize+'px'}"/>
</template>
<script setup lang="ts">
export interface Props {
  fontSize?:number,
  textClass?:string
}
withDefaults(defineProps<Props>(), {
  fontSize:15,
  textClass:'text-white'
})
</script>