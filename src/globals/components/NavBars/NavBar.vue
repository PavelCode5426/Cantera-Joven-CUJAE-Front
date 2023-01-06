<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AuthStore from '@/modules/authentication/store/auth.store'
import LogoutItem from '~/modules/authentication/components/navbar/LogoutItem.vue'
import navBarLinks from '@/globals/config/router/links'

const authStore = AuthStore()
const { user } = storeToRefs(authStore)
</script>

<template>
  <header class="navbar navbar-fixed-top">
    <!-- set fixed position by adding class "navbar-fixed-top" -->
    <div class="navbar-inner">
      <!-- logo -->
      <logo-brand />
      <!-- main menu -->
      <ul class="navbar-nav">
        <template v-for="link in navBarLinks">
          <nav-bar-item
            v-if="link.is_accesible"
            :name="link.name"
            :router="link.router"
            :childrens="link.childrens"
            :icon="link.icon"
            :is-root="true"
          />
        </template>
      </ul>
      <!-- notifications and other links -->
      <ul class="nav navbar-right pull-right">
        <nav-bar-notifications-container />
        <li>
          <span href="">{{ user?.first_name }} {{ user?.last_name }}</span>
        </li>
        <logout-item />

        <!-- mobile only -->
        <li class="visible-xs">
          <!-- open/close menu icon (do not remove if you want to enable menu on mobile devices) -->
          <div class="horizontal-mobile-menu visible-xs">
            <a class="with-animation cursor-pointer">
              <!-- add class "with-animation" to support animation -->
              <i class="entypo-menu" />
            </a>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>
