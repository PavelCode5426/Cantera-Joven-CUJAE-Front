<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type NotificationModel from '../../../backed_services/models/notification.model'
import NotiService from '../../../backed_services/notification.services'
import { Paginate } from '../../../backed_services/service'
import { ExceptionResponse, ServerError } from '@/globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect, isExceptionResponse } from '~/helpers/utils'

const router = useRouter()
const notifications = ref<NotificationModel[]>([])
let notifications_init: NotificationModel[] = []
const paginate = new Paginate(0)

async function loadNotificationsFromServer() {
  try {
    const response = await NotiService.allNotifications()
    response.lista.forEach(i => i.isSelected = false)
    notifications_init = response.lista
    changeCurrentPageHandler()
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
function findNotificationInList(id: number) {
  return notifications.value.find(currentValue => currentValue.id === id)
}
function toogleSelectedItem(id: number) {
  const notification = findNotificationInList(id)
  if (!(notification === undefined))
    notification.isSelected = !notification.isSelected
}
function changeCurrentPageHandler() {
  const next = notifications_init.slice(paginate.page_size * paginate.page, paginate.page_size * ++paginate.page)
  notifications.value.push(...next)
}

async function markAsReadNotification(id: number) {
  try {
    const notification = findNotificationInList(id)
    if (notification) {
      notification.unread = false
      const response = await NotiService.markAsRead(id)
      ElNotification.success('Notificacion marcada como leida')
    }
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}
async function deleteNotification(id: number) {
  try {
    const notification = findNotificationInList(id)
    if (notification) {
      const response = await NotiService.delete(id)
      ElNotification.success('Notificacion eliminada correctamente')
      notifications.value = notifications.value.filter(i => i.id != id)
    }
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)

    if (isExceptionResponse(error)) {
      if (error.httpCode == 404)
        ElNotification.error('Notificacion no encontrada')
    }
  }
}

provide('toogleSelectedItem', toogleSelectedItem)
provide('markAsReadNotification', markAsReadNotification)
provide('deleteNotification', deleteNotification)

loadNotificationsFromServer()
</script>

<template>
  <h3>Notificaciones <el-badge :value="notifications.length" :max="10" class="item" /></h3>
  <!--  <el-scrollbar v-infinite-scroll="changeCurrentPageHandler" max-height="300px" tag="ul" view-class="comments-list"> -->
  <ul v-infinite-scroll="changeCurrentPageHandler" class="comments-list">
    TODO PONER BORRADO MULTIPLE Y MARCAR COMO LEIDO SELECCIONADAS Y UN SELECCIONAR TODO
    <mail-notification-item
      v-for="notification in notifications"
      :id="notification.id"
      :unread="notification.unread"
      :verb="notification.verb"
      :from="notification.sender.first_name"
      :is-selected="notification.isSelected"
      :time="notification.timestamp"
    />
  </ul>
  <!--  </el-scrollbar> -->
  <el-empty v-if="!notifications.length" description="Sin notificaciones" />
</template>

<style scope>
.comments-list{
 height: 70vh;
  overflow: auto;
}
</style>
