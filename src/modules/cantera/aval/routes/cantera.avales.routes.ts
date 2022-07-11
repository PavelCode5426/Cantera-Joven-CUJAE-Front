import {RouteRecordRaw} from "vue-router"
import {putPrefixInRoutes} from "~/helpers/router.load"

const prefix = 'cantera/'
const routes:RouteRecordRaw[] = [
    {
        path:'estudiantes',
        name:'c-estudiantes',
        component:() => import("../pages/AreaStudentsPage.vue"),
        meta:{
            title:"Listado de Estudiantes"
        },
        layout:["Admin"]
    },
    {
        path:'sin-aval',
        name:'c-estudiantes-sin-aval',
        component:() => import("../pages/AreaStudentWithoutAvalPage.vue"),
        meta:{
            title:"Listado de Estudiantes sin Aval"
        },
        layout:["Admin"]
    },
]

putPrefixInRoutes(prefix,routes)
export default routes
