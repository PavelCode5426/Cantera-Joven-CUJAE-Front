<script setup lang="ts">
import { inject } from 'vue'

interface Props {
  title: string
  confirmButtonType: string
  buttonType: string
  buttonTitle: string
  buttonIcon: string
  loading: boolean
  keepLoading: boolean
}
const props = withDefaults(defineProps<Props>(), {
  confirmButtonType: 'primary',
  buttonType: 'default',
  loading: false,
  keepLoading: false,
})
const emit = defineEmits(['on-confirm', 'on-cancel'])
const loadingConfirm = ref(false)

function onConfirm() {
  loadingConfirm.value = true
  emit('on-confirm')
  if (!props.keepLoading)
    loadingConfirm.value = false
}
</script>

<template>
  <el-popconfirm
    :title="title"
    :confirm-button-type="confirmButtonType"
    :hide-icon="true"
    @confirm="onConfirm"
    @cancel="emit('on-cancel')"
  >
    <template #reference>
      <p-button
        :loading="loadingConfirm || loading"
        :button-type="buttonType"
        :button-title="buttonTitle"
        :button-icon="buttonIcon"
      />
    </template>
  </el-popconfirm>
</template>
