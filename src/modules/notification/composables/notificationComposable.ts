import type UserModel from '~/backed_services/models/user.model'

export interface NotificationItemProps {
  id: number
  from: UserModel | undefined

  unread?: boolean
  imgUrl?: string
  time?: string
  verb?: string
}

const defaultNotificationProps = {
  unread: true,
  imgUrl: '',
}
export default defaultNotificationProps
