<template>
  <el-popconfirm :title="title"
                 :confirm-button-type="confirmButtonType"
                 :hide-icon="true"
                 @confirm="emit('on-confirm')"
                 @cancel="emit('on-cancel')"
  >
    <template #reference>
      <button type="button" class="btn btn-danger uk-text-bold">
        <i class="entypo-cancel"/> Eliminar
      </button>
    </template>
  </el-popconfirm>
</template>


<script setup lang="ts">

interface Props{
  title:string,
  confirmButtonType:string,
}

withDefaults(defineProps<Props>(),{
  confirmButtonType:'primary',
})

const emit = defineEmits(['on-confirm','on-cancel'])


</script>