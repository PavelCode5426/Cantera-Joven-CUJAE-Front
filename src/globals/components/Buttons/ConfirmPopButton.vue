<script setup lang="ts">
import { toogleLoadingDecorator } from '~/globals/composables/useLoading'
interface Props {
  title: string
  buttonType: string
  confirmButtonType: string
  buttonTitle: string
  buttonIcon: string
}
withDefaults(defineProps<Props>(), {
  confirmButtonType: 'primary',
  buttonType: 'btn-info',
  buttonIcon: '',
})
const emit = defineEmits(['on-confirm', 'on-cancel'])
const loadingConfirm = ref(false)
</script>

<template>
  <el-popconfirm
    :title="title"
    :confirm-button-type="confirmButtonType"
    :hide-icon="true"
    @confirm="emit('on-confirm')"
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
