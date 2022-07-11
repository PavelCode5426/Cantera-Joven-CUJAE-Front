import {RouteRecordRaw} from "vue-router"
import {putPrefixInRoutes} from "~/helpers/router.load"

const prefix = 'familiarizacion/'
const routes:RouteRecordRaw[] = [
    {
        path:'area/asignar',
        name:'f-asignar-areas',
        component:() => import("../pages/AssignAreaPage.vue"),
        meta:{
            title:"Asignar Area"
        },
        layout:["Admin"]
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
