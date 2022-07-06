<template>
  <h3>Notificaciones <el-badge :value="notifications.length" :max="10" class="item"/></h3>
  <ul class="comments-list">
    <mail-notification-item v-for="notification in notifications"
                            :id="notification.id"
                            :unread="notification.unread"
                            :verb="notification.verb"
                            :from="notification.sender.first_name"
                            :isSelected="notification.isSelected"
                            :time="notification.timestamp"/>
  </ul>
  <el-empty v-if="!notifications.length" description="Sin notificaciones"/>
</template>
<script setup lang="ts">
import NotificationServiceInstance from "@/services/notification.services"
import {ServerError} from "@/globals/config/axios"
import {checkServerError} from "~/helpers/utils";

const router = useRouter()
let notifications = ref([])

async function loadNotificationsFromServer() {
// // const notifications = await NotificationServiceInstance.allNotifications() TODO PONER ESTO
  const notificationsResponse = await NotificationServiceInstance.notReadNotifications()
  checkServerError(notificationsResponse)

  if (notificationsResponse.httpCode == 401)
    router.push({name:'login-page'})

  notificationsResponse.data.lista.forEach(i => i.isSelected = false)
  notifications.value = notificationsResponse.data.lista
}
function findNotificationInList(id:number) {
  return notifications.value.find((currentValue)=> currentValue.id === id)
}
function toogleSelectedItem(id:number) {
  const notification = findNotificationInList(id)
  if (!(notification === undefined))
    notification.isSelected = !notification.isSelected
}
async function markAsReadNotification(id:number){
  const notification = findNotificationInList(id)
  if (!(notification === undefined))
  {
    notification.unread = false
    const notificationsResponse = await NotificationServiceInstance.markAsReadNotification(notification.id)
    if (notificationsResponse instanceof ServerError)
      router.push({name:'server-error-page',query:{message:notificationsResponse.error.message}})
    else if (notificationsResponse.httpCode == 404)
      ElMessage.error({showClose:true,message:'Notificacion no encontrada'})
    else ElMessage.success({showClose:true,message:'Notificacion marcada como leida correctamente'})

  }
}
async function deleteNotification(id:number){
  const notificationsResponse = await NotificationServiceInstance.markAsReadNotification(id)
  if (notificationsResponse instanceof ServerError)
    router.push({name:'server-error-page',query:{message:notificationsResponse.error.message}})
  else if (notificationsResponse.httpCode == 404)
    ElMessage.error({showClose:true,message:'Notificacion no encontrada'})
  else {
    notifications.value = notifications.value.filter(i => i.id != id)
    ElMessage.success({showClose:true,message:'Notificacion eliminada correctamente'})
  }
}



provide('toogleSelectedItem',toogleSelectedItem)
provide('markAsReadNotification',markAsReadNotification)
provide('deleteNotification',deleteNotification)
loadNotificationsFromServer()
</script>