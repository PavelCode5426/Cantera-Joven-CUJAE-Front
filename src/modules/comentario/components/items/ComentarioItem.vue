<script setup lang="ts">
import { defineProps } from 'vue'
import type ComentarioModel from '../../../../backed_services/models/comentario.model'
import { getRealativeTime } from '~/helpers/utils'

interface Prop {
  data: ComentarioModel
}
const props = defineProps<Prop>()
</script>

<template>
  <div class="comment-details">
    <div class="comment-head">
      <a>{{ props.data?.usuario?.first_name }} {{ props.data?.usuario?.last_name }}</a>
    </div>
    <p class="comment-text" v-html="props.data?.texto" />
    <div class="comment-footer">
      <div class="comment-time">
        {{ getRealativeTime(props.data?.fecha) }}
      </div>
    </div>
  </div>
</template>
