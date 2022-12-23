import AbstractService from '~/backed_services/service'
import type NotificationModel from '~/backed_services/models/notification.model'

interface INotificationService {

}

class NotificationService extends AbstractService implements INotificationService {
  async notReadNotifications(): { cantidad_sin_leer: number;lista: NotificationModel[] } {
    const call = this.callWithToken().get('notificacion/sin-leer')
    const response = await this.parseResponse(call)
    return response.data
  }

  async allNotifications(): { cantidad_total: number;lista: NotificationModel[] } {
    const call = this.callWithToken().get('notificacion/')
    const response = await this.parseResponse(call)
    return response.data
  }

  async markAsRead(id: number): boolean {
    const call = this.callWithToken().post(`notificacion/marcar-como-leido/${id}`)
    const response = await this.parseResponse(call)
    return response.data
  }

  async delete(id: number): boolean {
    const call = this.callWithToken().delete(`notificacion/${id}`)
    const response = await this.parseResponse(call)
    return response.data
  }
}

const NotiService = new NotificationService()
export default NotiService
