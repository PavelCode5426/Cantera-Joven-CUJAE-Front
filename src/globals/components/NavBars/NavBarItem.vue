<template>
  <li>
    <router-link v-if="router" :to="router" active-class="active">
      <i v-if="icon" :class="icon"/>
      <span>{{name}}</span>
    </router-link>
    <a href="#" v-else>
      <i v-if="icon" :class="icon"/>
      <span>{{name}}</span>
    </a>
    <ul v-if="childrens.length">
      <nav-bar-item v-for="link in childrens"
                    :name="link.name"
                    :router="link.router"
                    :icon="link.icon"
                    :childrens="link.childrens"/>
    </ul>
  </li>
</template>
<script setup lang="ts">
import {RouteRecordRaw} from "vue-router"
import {Link} from "@/globals/config/router/links"

interface Props {
  name: string
  router: RouteRecordRaw | undefined
  childrens: Link[]
  isRoot?:boolean
  icon?:string | undefined
}
const props = withDefaults(defineProps<Props>(),{
  isRoot:false,
  router:undefined,
  icon:undefined,
  childrens:[],
})

</script>
