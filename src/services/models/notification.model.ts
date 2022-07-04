import UserModel from "~/services/models/user.model";

export default class NotificationModel {
    id:number
    unread:boolean
    deleted:boolean
    level:string
    verb:string
    description:string
    timestamp:string
    sender:UserModel
    data:any

    constructor(attr:Object) {
        const keys = Object.keys(NotificationModel)
        keys.forEach(i => this[i] = attr[i])
    }
}