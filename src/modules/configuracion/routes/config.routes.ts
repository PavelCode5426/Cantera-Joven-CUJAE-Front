import {RouteRecordRaw} from "vue-router";

const routes:RouteRecordRaw[] = [
    {
        path:'config',
        name:'config-page',
        component:() => import("../pages/ConfigurationPage.vue"),
        meta: {
            title: "Configuracion del Sistema"
        },
        layout:["Admin"]
    }
]
export default routes