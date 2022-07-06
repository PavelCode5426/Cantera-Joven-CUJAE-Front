<template>
  <body class="page-body">
  <div class="page-container horizontal-menu">
    <nav-bar/>
    <div class="main-content">
      <router-view />
    </div>
  </div>
  </body>
</template>
<script setup lang="ts">
import {load_script,unload_script} from "~/helpers/vue.loadscript";
load_script("/assets/js/neon-custom.js")

onUnmounted(()=>unload_script("/assets/js/neon-custom.js"))
</script>