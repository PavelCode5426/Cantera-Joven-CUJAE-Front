<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { defineProps } from 'vue'
// import { editorConfig } from '../../plugins/ckeditor/config'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
})

const editor = ClassicEditor
const editorConfig = {}
</script>

<template>
  <ckeditor v-model="value" :editor="editor" :config="editorConfig" style="width: 100%" />
</template>

<style scoped>

</style>
