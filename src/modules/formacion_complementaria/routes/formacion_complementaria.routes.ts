import {RouteRecordRaw} from "vue-router";
import {putPrefixInRoutes} from "~/helpers/router.load";

const prefix = 'formacion-complementaria/'
const routes:RouteRecordRaw[] = [
    {
        path:'conformar',
        name:'fc-conformar',
        component: () => import("../pages/ShapePage.vue"),
        layout:["Admin"],
        meta:{
            title:"Conformar Formacion Complementaria"
        }
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
