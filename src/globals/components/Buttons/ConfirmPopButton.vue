<script setup lang="ts">
import { toogleLoadingDecorator } from '~/globals/composables/useLoading'

withDefaults(defineProps<Props>(), {
  confirmButtonType: 'primary',
  buttonType: 'btn-info',
  buttonIcon: '',
})
const emit = defineEmits(['on-confirm', 'on-cancel'])
const loadingConfirm = ref(false)
interface Props {
  title: string
  buttonType: string
  confirmButtonType: string
  buttonTitle: string
  buttonIcon: string
}
let onConfirmEvent = () => {
  emit('on-confirm')
}
onConfirmEvent = toogleLoadingDecorator(onConfirmEvent, loadingConfirm)
</script>

<template>
  <el-popconfirm
    :title="title"
    :confirm-button-type="confirmButtonType"
    :hide-icon="true"
    @confirm="onConfirmEvent()"
    @cancel="emit('on-cancel')"
  >
    <template #reference>
      <p-button
        :loading="loadingConfirm"
        :button-type="buttonType"
        :button-title="buttonTitle"
        :button-icon="buttonIcon"
      />
    </template>
  </el-popconfirm>
</template>
