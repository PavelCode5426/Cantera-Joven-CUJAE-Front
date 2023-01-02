<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import {
  EstadoPlanFormacion,
} from '../../../../../backed_services/models/formacion_individual.model'
import type {
  ActividadFormacionModel,
  PlanFormacionModel,
} from '../../../../../backed_services/models/formacion_individual.model'
import { Paginate } from '../../../../../backed_services/service'
import { activateLoading, desactivateLoading } from '../../../../../globals/composables/useLoading'
import type ComentarioModel from '../../../../../backed_services/models/comentario.model'
import comentarioService from '../../../../../backed_services/comentario.serives'
import { ExceptionResponse, ServerError } from '../../../../../globals/config/axios'

interface Prop {
  actividad: ActividadFormacionModel
}

const props = defineProps<Prop>()
let paginator = new Paginate()
const comentarios = ref<ComentarioModel[]>([])
const isLoading = ref(false)
const noMore = ref(false)

async function loadData(plan_id, paginator: Paginate) {
  activateLoading(isLoading)
  try {
    const response = await comentarioService.list_comentarios_from_actividad_formacion(plan_id, paginator)
    if (response.next !== null) {
      paginator.page++
      noMore.value = false
    }
    else { noMore.value = true }
    comentarios.value.push(...response.results)
  }
  catch (error: ExceptionResponse | ServerError) {
    alert(error.httpCode)
  }
  desactivateLoading(isLoading)
}
async function newCommentHandler(comentario: ComentarioModel) {
  try {
    const response = await comentarioService.add_comentario_to_actividad_individual(props.actividad?.id, comentario.texto)
    const newComentario = comentario
    comentarios.value = [newComentario, ...comentarios.value]
    ElNotification.success('Plan de Formacion comentado correctamente')
  }
  catch (e: ExceptionResponse | ServerError) {
  }
}
async function infiniteScrollHandler() {
  if (!noMore.value)
    await loadData(props.plan?.id, paginator)
}

watch(props, (newValue, oldValue) => {
  paginator = new Paginate()
  noMore.value = false
  comentarios.value = []
  if (newValue.actividad)// TODO REVISAR PORQUE ME SACA 3 VECES LOS COMENTARIOS
    loadData(newValue.actividad?.id, paginator)
})

loadData(props.actividad?.id, paginator)
</script>

<template>
  <comentario-list v-infinite-scroll="infiniteScrollHandler" :infinite-scroll-immediate="false" :data="comentarios" :no-more="noMore" :is-loading="isLoading" />
  <comentario-form @new="newCommentHandler" />
</template>
