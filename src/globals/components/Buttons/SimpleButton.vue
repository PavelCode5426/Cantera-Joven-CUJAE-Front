<template>
  <button type="button" class="btn uk-text-bold" :class="buttonType">
    <loading v-if="loading || forceLoading"/>
    <i v-else :class="buttonIcon"/> {{buttonTitle}}
  </button>
</template>

<script setup lang="ts">
import {activateLoading,desactivateLoading} from "~/globals/composables/useLoading";

interface Props {
  loading:boolean
  buttonType:string,
  buttonTitle:string,
  buttonIcon: {
    type:string,
    required:false
  }
}

const props = withDefaults(defineProps<Props>(),{
  buttonType:'btn-info',
  loading:false,
})
const forceLoading = ref(false)

const activateLocalLoading = () => activateLoading(forceLoading)
const desactivateLocalLoading = () => desactivateLoading(forceLoading)
defineExpose({activateLocalLoading,desactivateLocalLoading})

</script>