<script setup lang="ts">
import defaultNotificationProps from "~/modules/notification/composables/notificationComposable"

interface NotificationItemProps {
  id:number
  from:string

  unread?:boolean
  imgUrl?:string
  time?:string
  verb?:string
}
withDefaults(defineProps<NotificationItemProps>(),{...defaultNotificationProps})

</script>
<template>
  <li>
    <a>
    <span class="image pull-right">
                <img :src="imgUrl" alt="" class="img-circle" />
    </span>
      <span class="line" v-if="unread"><strong>{{from}}</strong> - {{time}}</span>
      <span class="line" v-else>{{from}} - {{time}}</span>
      <span class="line desc small">{{verb}}</span>
    </a>
  </li>
</template>