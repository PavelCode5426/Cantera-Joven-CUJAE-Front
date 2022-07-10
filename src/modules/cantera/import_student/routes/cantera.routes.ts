import {RouteRecordRaw} from "vue-router";
import {putPrefixInRoutes} from "~/helpers/router.load";

const prefix = 'cantera/'
const routes:RouteRecordRaw[] = [
    {
        path:'conformar',
        name:'c-conformar',
        component: () => import("../components/CreateAval.vue"),
        layout:["Admin"],
        meta:{
            title:"Crear Aval"
        }
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
