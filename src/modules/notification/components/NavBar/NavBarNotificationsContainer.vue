<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ElNotification } from 'element-plus'
import NotiService from '../../../../backed_services/notification.services'
import { activateLoading, desactivateLoading } from '../../../../globals/composables/useLoading'
import NotificationStore from '~/modules/notification/store/notification.store'
import AuthStore from '~/modules/authentication/store/auth.store'
import notificationServiceInstance from '~/services/notification.services'
import type { ServerError, ServerResponse } from '~/globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '~/helpers/utils'
import NavBarNotificationEmpty from '~/modules/notification/components/NavBar/NavBarNotificationEmpty.vue'

const notificationsStore = NotificationStore()
const { isLoading, notReadAmount, notifications } = storeToRefs(notificationsStore)

const router = useRouter()

async function updateNotification() {
  activateLoading(isLoading)
  try {
    const response = await NotiService.notReadNotifications()
    const hasNewNotifications = notReadAmount.value < response.cantidad_sin_leer
    notReadAmount.value = response.cantidad_sin_leer
    notifications.value = response.lista.slice(0, 10)

    if (hasNewNotifications)
      ElNotification.info('Nueva notificacion recibida')
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
  desactivateLoading(isLoading)
}

const intervalSeconds = 15
const intervalFunction = setInterval(updateNotification, 1000 * intervalSeconds)

onUnmounted(() => clearInterval(intervalFunction))
updateNotification()
</script>

<template>
  <li class="dropdown">
    <a class="dropdown-toggle cursor-pointer" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
      <i class="entypo-mail" />
      <span class="badge badge-danger">
        <Loading v-if="isLoading" />
        <template v-else-if="notReadAmount">{{ notReadAmount }}</template>
      </span>
    </a>
    <!-- dropdown menu (messages) -->
    <ul class="dropdown-menu">
      <li>
        <ul class="dropdown-menu-list scroller">
          <nav-bar-notification-empty v-if="!notReadAmount" />
          <nav-bar-notification-item
            v-for="notification in notifications"
            :id="notification.id"
            :unread="notification.unread"
            :verb="notification.verb"
            :from="notification.sender"
            :time="notification.timestamp"
          />
        </ul>
      </li>

      <li class="external">
        <router-link :to="{ name: 'notification-page' }" class="cursor-pointer">
          Ver Todos
        </router-link>
      </li>
    </ul>
  </li>
</template>
