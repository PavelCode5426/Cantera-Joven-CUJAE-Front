import {RouteRecordRaw} from "vue-router";
import {putPrefixInRoutes} from "~/helpers/router.load";

const prefix = 'aval/'
const routes:RouteRecordRaw[] = [
    // {
    //     path:'crear-aval',
    //     name:'crear-aval',
    //     component: () => import("../pages/ShapePage.vue"),
    //     layout:["Admin"],
    //     meta:{
    //         title:"Conformar Familiarizacion"
    //     }
    // }
]

putPrefixInRoutes(prefix,routes)
export default routes
