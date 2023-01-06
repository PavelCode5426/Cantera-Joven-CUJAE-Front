<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type { Link } from '@/globals/config/router/links'

interface Props {
  name: string
  router: RouteRecordRaw | undefined
  childrens: Link[]
  isRoot?: boolean
  icon?: string | undefined
}
const props = withDefaults(defineProps<Props>(), {
  isRoot: false,
  router: undefined,
  icon: undefined,
  childrens: [],
})
</script>

<template>
  <li>
    <router-link v-if="router" :to="router" active-class="active">
      <i v-if="icon" :class="icon" />
      <span>{{ name }}</span>
    </router-link>
    <a v-else href="#">
      <i v-if="icon" :class="icon" />
      <span>{{ name }}</span>
    </a>
    <ul v-if="childrens.length">
      <template v-for="link in childrens">
        <nav-bar-item
          v-if="link.is_accesible"
          :name="link.name"
          :router="link.router"
          :icon="link.icon"
          :childrens="link.childrens"
        />
      </template>
    </ul>
  </li>
</template>
