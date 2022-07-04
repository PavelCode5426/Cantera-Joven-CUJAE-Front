import {CallWithToken, ServerError, SerializePromese, ServerResponse} from '@/globals/config/axios'
import NotificationModel from "~/services/models/notification.model"
import {getRealativeTime} from "~/helpers/utils";


export class NotificationService {
    public async notReadNotifications(): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().get('notificacion/sin-leer')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) {
            response.data.lista = response.data.lista as NotificationModel[]
            response.data.lista.forEach(i => i.timestamp = getRealativeTime(i.timestamp))
        }
        return response
    }
    public async allNotifications(): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().get('notificacion')
        const response = await SerializePromese(call)
        if (response instanceof ServerResponse && response.httpCode == 200) {
            response.data.lista = response.data.lista as NotificationModel[]
            response.data.lista.forEach(i => i.timestamp = getRealativeTime(i.timestamp))
        }
        return response
    }
    public async markAsReadNotification(id:number): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().post(`notificacion/marcar-como-leido/${id}`)
        const response = await SerializePromese(call)
        return response
    }
    public async deleteNotification(id:number): Promise<ServerResponse | ServerError> {
        const call = CallWithToken().delete(`notificacion/${id}`)
        const response = await SerializePromese(call)
        return response
    }

}

const notificationServiceInstance = new NotificationService()
export default notificationServiceInstance