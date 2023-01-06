<script setup lang="ts">
import type UserModel from '~/backed_services/models/user.model'
import defaultNotificationProps from '~/modules/notification/composables/notificationComposable'

interface NotificationItemProps {
  id: number
  from: UserModel
  unread?: boolean
  verb?: string
}
const props = withDefaults(defineProps<NotificationItemProps>(), { ...defaultNotificationProps })
const imageURL = ref(`http://intranet.cujae.edu.cu/Image.aspx?ci=${props.from.carnet}`)
</script>

<template>
  <li>
    <a>
      <span class="image pull-right">
        <avatar :src="imgUrl" />
      </span>
      <span v-if="unread" class="line"><strong>{{ from.first_name }} {{ from.last_name }}</strong> - {{ time }}</span>
      <span v-else class="line">{{ from.first_name }} {{ from.last_name }} - {{ time }}</span>
      <span class="line desc small">{{ verb }}</span>
    </a>
  </li>
</template>
