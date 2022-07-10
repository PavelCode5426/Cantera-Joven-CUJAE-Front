import {RouteRecordRaw} from "vue-router";
import {putPrefixInRoutes} from "~/helpers/router.load";

const prefix = 'familiarizacion/'
const routes:RouteRecordRaw[] = [
    {
        path:'conformar',
        name:'f-conformar',
        component: () => import("../pages/ShapePage.vue"),
        layout:["Admin"],
        meta:{
            title:"Conformar Familiarizacion"
        }
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
