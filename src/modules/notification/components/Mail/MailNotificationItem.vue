<template>
  <li>
    <input type="checkbox" @click="toogleSelectedItem(id)" :checked="isSelected"/>
    <div class="comment-details">
      <div class="comment-head">
        <a>{{from}}</a>
      </div>
      <p class="comment-text">
        {{verb}}
      </p>
      <div class="comment-footer">
        <div class="comment-time">
          {{time}}
        </div>
        <div class="action-links">
          <a v-if="unread" class="approve cursor-pointer" @click="markAsReadItem(id)">
            <loading v-if="markAsReadLoading" textClass="text-success"/>
            <i class="entypo-check" v-else/>
            Marcar como leido
          </a>
          <a class="delete cursor-pointer" @click="deleteItem(id)">
            <loading v-if="deleteLoading" textClass="text-danger"/>
            <i class="entypo-cancel" v-else/>
            Borrar
          </a>
        </div>

      </div>

    </div>
  </li>
</template>

<script setup lang="ts">
import defaultNotificationProps from "@/modules/notification/composables/notificationComposable"

interface NotificationMailProps{
  id:number
  from:string

  unread?:boolean
  imgUrl?:string
  time?:string
  verb?:string
  isSelected:boolean
}
withDefaults(defineProps<NotificationMailProps>(),{
  ...defaultNotificationProps,
  isSelected:false
})

const deleteLoading = ref(false)
const markAsReadLoading = ref(false)

const toogleSelectedItem = inject('toogleSelectedItem')
const markAsReadNotification = inject('markAsReadNotification')
const deleteNotification = inject('deleteNotification')


async function markAsReadItem(id:number){
  markAsReadLoading.value = true
  await markAsReadNotification(id)
  markAsReadLoading.value = false
}
async function deleteItem(id:number){
  deleteLoading.value = true
  await deleteNotification(id)
  deleteLoading.value = false
}
</script>

<style scoped>

</style>