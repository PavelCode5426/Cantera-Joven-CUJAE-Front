<script lang="ts" setup>
import { computed, defineProps, ref, watch, withDefaults } from 'vue'
import { ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'

import FColectivaServices from '~/backed_services/formacion_colectiva.services'
import type { ActividadFormacionColectivaModel } from '../../../../../backed_services/models/formacion_colectiva.model'
import type ArchivoModel from '~/backed_services/models/archivo.model'

interface Props {
  actividad: ActividadFormacionColectivaModel
  disabled: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})
const fileList = ref<UploadUserFile[]>([])
const headers = ref<Record<string, any>>()

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  window.open(uploadFile.url, '_blank')
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`¿Esta seguro que desea eliminar el archivo ${uploadFile.name}?`).then(() => FColectivaServices.delete_archivo(uploadFile.uid)).catch(() => false )
}

const onSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  const file = response as ArchivoModel
  uploadFile.uid = file.id
  uploadFile.name = file.nombre
  uploadFile.url = file.archivo
  uploadFile.size = file.size
}

const url = computed(() => {
  return `${import.meta.env.VITE_URL_SERVER}/actividad-colectiva/${props.actividad?.id}/subir-archivo`
})

watch(props, () => {
  fileList.value = []
  props.actividad?.documentos.forEach(i => fileList.value.push({
    name: i.nombre,
    url: i.archivo,
    size: i.size,
    uid: i.id,
  }))
})

props.actividad?.documentos.forEach(i => fileList.value.push({
  uid: i.id,
  name: i.nombre,
  url: i.archivo,
  size: i.size,
}))
</script>

<template>
  <el-form-item>
    <el-upload
      v-model:file-list="fileList"
      :action="url"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-success="onSuccess"
      :disabled="props.disabled"
    >
      <template #tip>
        <div class="el-upload__tip">
          Suba archivos referentes a la actividad.
        </div>
      </template>
    </el-upload>
  </el-form-item>
</template>



