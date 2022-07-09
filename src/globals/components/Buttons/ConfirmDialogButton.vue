<template>
  <button type="button" class="btn uk-text-bold" :class="buttonType" @click="onClickButton()">
    <loading v-if="loadingConfirm"/>
    <i v-else :class="buttonIcon"/> {{buttonTitle}}
  </button>
</template>


<script setup lang="ts">
import {toogleLoadingDecorator} from "~/globals/composables/useLoading";
import {ElMessageBox} from "element-plus";

const loadingConfirm = ref(false)
interface Props{
  dialogTitle:string,
  dialogMessage:string,
  buttonTitle:string,
  buttonIcon:string,
  buttonType:string
}
const props = withDefaults(defineProps<Props>(),{
  buttonType:'btn-info',
  buttonIcon:'',
  dialogTitle:'Alerta'
})
const emit = defineEmits(['on-confirm','on-cancel'])

let onConfirmEvent = () => {
  emit('on-confirm')
}
onConfirmEvent = toogleLoadingDecorator(onConfirmEvent,loadingConfirm)

function onClickButton(){
  ElMessageBox.confirm(props.dialogMessage,props.dialogTitle,{

  })
      .then(response => emit('on-confirm'))
      .catch(error => emit('on-cancel'))
}

</script>