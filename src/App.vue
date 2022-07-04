<script setup lang="ts">
import SiteStore from "./globals/stores/site.store";
import {storeToRefs} from "pinia";
const siteStore = SiteStore()
const {title,isLoading} = storeToRefs(siteStore)
useHead({
  title: title.value,
  meta:[
    {
      name: "description",
      content:"description of the site",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
  ],
});

watch(title,(newValue,lastValue) => {
  document.title = newValue
})

</script>

<template>
  <LoadingPage v-if="isLoading"/>
  <RouterView v-else />
</template>
