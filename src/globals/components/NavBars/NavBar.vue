<template>
  <header class="navbar navbar-fixed-top">
    <!-- set fixed position by adding class "navbar-fixed-top" -->
    <div class="navbar-inner">
      <!-- logo -->
      <logo-brand/>
      <!-- main menu -->
      <ul class="navbar-nav">
        <nav-bar-item v-for="link in navBarLinks"
                      :name="link.name"
                      :router="link.router"
                      :childrens="link.childrens"
                      :icon="link.icon"
                      :isRoot="true"
        />
      </ul>
      <!-- notifications and other links -->
      <ul class="nav navbar-right pull-right">
        <nav-bar-notifications-container />
        <li>
          <span href="">{{ first_name }} {{last_name}}</span>
        </li>
        <logout-item/>

        <!-- mobile only -->
        <li class="visible-xs">
          <!-- open/close menu icon (do not remove if you want to enable menu on mobile devices) -->
          <div class="horizontal-mobile-menu visible-xs">
            <a  class="with-animation cursor-pointer">
              <!-- add class "with-animation" to support animation -->
              <i class="entypo-menu"></i>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>
<script setup lang="ts">
import AuthStore from "@/modules/authentication/store/auth.store"
import {storeToRefs} from "pinia";
import LogoutItem from "~/modules/authentication/components/navbar/LogoutItem.vue"
import navBarLinks from "@/globals/config/router/links"

const authStore = AuthStore()
const {first_name,last_name} = storeToRefs(authStore)

</script>