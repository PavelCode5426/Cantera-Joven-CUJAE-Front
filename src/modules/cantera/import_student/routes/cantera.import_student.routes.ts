import {RouteRecordRaw} from "vue-router";
import {putPrefixInRoutes} from "~/helpers/router.load";

const prefix = 'cantera/'
const routes:RouteRecordRaw[] = [
    {
        path:'conformar',
        name:'c-conformar',
        component: () => import("../pages/ShapePage.vue"),
        layout:["Admin"],
        meta:{
            title:"Conformar Cantera Joven"
        }
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
