import {RouteRecordRaw} from "vue-router";

const routes:RouteRecordRaw[] = [
    {
        path:'notification',
        name:'notification-page',
        component:() => import("../pages/NotificationPage.vue"),
        meta: {
            title: "Notificaciones"
        },
        layout:["Admin"]
    }
]
export default routes