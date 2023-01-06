import { defineStore } from 'pinia'
import type NotificationModel from '@/backed_services/models/notification.model'

export interface siteNotificationModel {
  notReadAmount: number | undefined
  isLoading: boolean
  notifications: NotificationModel[]
}

const siteStore = defineStore('notification', () => {
  const notReadAmount = ref<number | undefined>(undefined)
  const isLoading = ref<boolean>(true)
  const notifications = ref<NotificationModel[]>([])

  return { notReadAmount, isLoading, notifications }
})
export default siteStore
