import type UserModel from '~/backed_services/models/user.model'

export default class NotificationModel {
  id: number
  level: string
  verb: string
  description: string | undefined
  data: string | undefined
  unread: boolean
  timestamp: string
  sender: UserModel | undefined
}
