<template>
  <li class="dropdown">
    <a class="dropdown-toggle cursor-pointer" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
      <i class="entypo-mail"></i>
      <span class="badge badge-danger">
            <Loading v-if="isLoading"/>
            <templante v-else-if="notReadAmount">{{notReadAmount}}</templante>
          </span>
    </a>
    <!-- dropdown menu (messages) -->
    <ul class="dropdown-menu">
      <li>
        <ul class="dropdown-menu-list scroller">
          <nav-bar-notification-empty v-if="notifications.length == 0"/>
          <nav-bar-notification-item v-for="notification in notifications"
                                     :id="notification.id"
                                     :unread="notification.unread"
                                     :verb="notification.verb"
                                     :from="notification.sender.first_name"
                                     :time="notification.timestamp" />
        </ul>
      </li>

      <li class="external">
        <router-link :to="{name:'notification-page'}" class="cursor-pointer">Ver Todos</router-link>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import NotificationStore from "~/modules/notification/store/notification.store"
import AuthStore from "~/modules/authentication/store/auth.store"
import {storeToRefs} from "pinia"
import notificationServiceInstance from "~/services/notification.services"
import {ServerError, ServerResponse} from "~/globals/config/axios";
import {checkServerErrorAndRedirect} from "~/helpers/utils";
import NavBarNotificationEmpty from "~/modules/notification/components/NavBar/NavBarNotificationEmpty.vue";

const notificationsStore = NotificationStore()
const authStore = AuthStore()
const {isLoading,notReadAmount,notifications} = storeToRefs(notificationsStore)

const $t = useI18n().t
const router = useRouter()


const updateNotification = async () => {
  isLoading.value = true
  let response:ServerResponse | ServerError = await notificationServiceInstance.notReadNotifications()
  checkServerErrorAndRedirect(response)
  if (response.httpCode == 401)
  {
    authStore.isAuthenticated = false //TODO ARREGLAR ESTO
    authStore.$reset()
    router.push({name: 'login-page'})
  }
  else {
    response = response.data
    notReadAmount.value = response.cantidad_sin_leer
    notifications.value = response.lista
  }
  setTimeout(() => isLoading.value = false,1000)
}

const intervalSeconds = 100
const intervalFunction = setInterval(updateNotification,1000 * intervalSeconds)

onUnmounted(() => clearInterval(intervalFunction))
updateNotification()
</script>