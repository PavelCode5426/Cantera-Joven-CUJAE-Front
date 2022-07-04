import {defineStore} from "pinia";
import NotificationModel from "@/services/models/notification.model";

export type siteNotificationModel = {
    notReadAmount: number|undefined,
    isLoading:boolean,
    notifications: NotificationModel[]
}
const initialState:siteNotificationModel = {
    notReadAmount:undefined,
    isLoading:true,
    notifications:[]
}

const siteStore = defineStore('notification',{
    state:() => initialState,
    actions: {
        setAttr(attr:siteNotificationModel|Object){
            Object.keys(attr).forEach(i => this[i] = attr[i])
        }
    },
    getters: {
    }
})
export default siteStore