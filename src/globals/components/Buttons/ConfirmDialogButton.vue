<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
interface Props {
  dialogTitle: string
  dialogMessage: string
  buttonTitle: string
  buttonIcon: {
    type: string
    required: false
  }
  buttonType: string
  loading: boolean
}
const props = withDefaults(defineProps<Props>(), {
  buttonType: 'btn-info',
  dialogTitle: 'Alerta',
  loading: false,
})
const emit = defineEmits(['on-confirm', 'on-cancel'])

function onClickButton() {
  ElMessageBox.confirm(props.dialogMessage, props.dialogTitle, {

  })
    .then(response => emit('on-confirm')())
    .catch(error => emit('on-cancel'))
}
</script>

<template>
  <p-button
    :loading="loading"
    :button-type="buttonType"
    :button-title="buttonTitle"
    :button-icon="buttonIcon"
    @click="onClickButton()"
  />
</template>
