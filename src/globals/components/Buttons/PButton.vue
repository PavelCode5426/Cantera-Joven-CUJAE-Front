<script setup lang="ts">
import { activateLoading, desactivateLoading } from '~/globals/composables/useLoading'

interface Props {
  loading: boolean
  buttonType: string
  buttonTitle: string
  buttonIcon: {
    type: string
    required: false
  }
}

const props = withDefaults(defineProps<Props>(), {
  buttonType: 'default',
  loading: false,
})
const forceLoading = ref(false)

const activateLocalLoading = () => activateLoading(forceLoading)
const desactivateLocalLoading = () => desactivateLoading(forceLoading)
defineExpose({ activateLocalLoading, desactivateLocalLoading })
</script>

<template>
  <!--  <button type="button" class="btn uk-text-bold" :class="buttonType"> -->
  <!--    <loading v-if="loading || forceLoading" /> -->
  <!--  </button> -->

  <el-button :type="buttonType" :loading="loading || forceLoading">
    <i v-if="!(loading || forceLoading)" :class="[buttonIcon, { margin: buttonTitle }]" />{{ buttonTitle }}
  </el-button>
</template>

<style scope>
.margin{
  margin-right: 6px;
}
</style>
