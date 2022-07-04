
export interface NotificationItemProps {
    id:number
    from:string

    unread?:boolean
    imgUrl?:string
    time?:string
    verb?:string
}

const defaultNotificationProps = {
    unread: true,
    imgUrl:''
}
export default defaultNotificationProps