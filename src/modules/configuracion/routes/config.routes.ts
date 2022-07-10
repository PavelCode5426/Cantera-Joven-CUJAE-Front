import {RouteRecordRaw} from "vue-router";

const routes:RouteRecordRaw[] = [
    {
        path:'configuracion',
        name:'config-page',
        component:() => import("../pages/ConfigurationPage.vue"),
        meta: {
            title: "Configuracion del Sistema"
        },
        layout:["Admin"]
    },
    {
        path:'registros',
        name:'log-page',
        component:() => import("../pages/LogsPage.vue"),
        meta: {
            title: "Registros en el Sistema"
        },
        layout:["Admin"]
    }
]
export default routes