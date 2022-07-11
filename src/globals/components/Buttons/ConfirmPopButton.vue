<template>
  <el-popconfirm :title="title"
                 :confirm-button-type="confirmButtonType"
                 :hide-icon="true"
                 @confirm="onConfirmEvent()"
                 @cancel="emit('on-cancel')">
    <template #reference>
      <simple-button :loading="loadingConfirm"
                     :buttonType="buttonType"
                     :buttonTitle="buttonTitle"
                     :buttonIcon="buttonIcon"/>
    </template>
  </el-popconfirm>
</template>


<script setup lang="ts">
import {toogleLoadingDecorator} from "~/globals/composables/useLoading";

const loadingConfirm = ref(false)
interface Props{
  title:string,
  buttonType:string,
  confirmButtonType:string,
  buttonTitle:string,
  buttonIcon:string
}
withDefaults(defineProps<Props>(),{
  confirmButtonType:'primary',
  buttonType:'btn-info',
  buttonIcon:''
})
const emit = defineEmits(['on-confirm','on-cancel'])

let onConfirmEvent = () => {
  emit('on-confirm')
}
onConfirmEvent = toogleLoadingDecorator(onConfirmEvent,loadingConfirm)


</script>