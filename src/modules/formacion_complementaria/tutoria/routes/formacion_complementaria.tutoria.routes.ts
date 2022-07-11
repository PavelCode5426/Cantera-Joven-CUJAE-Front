import {RouteRecordRaw} from "vue-router"
import {putPrefixInRoutes} from "~/helpers/router.load"

const prefix = 'formacion-complementaria/'
const routes:RouteRecordRaw[] = [
    {
        path:'tutores',
        name:'fc-tutores',
        component:() => import("../pages/AraTutorListPage.vue"),
        meta:{
            title:"Listado de Tutores"
        },
        layout:["Admin"]
    },
    {
        path:'graduados',
        name:'fc-graduados',
        component:() => import("../pages/AraGraduateListPage.vue"),
        meta:{
            title:"Listado de Graduados"
        },
        layout:["Admin"]
    },
    {
        path:'sin-aval',
        name:'fc-graduados-sin-aval',
        component: () => import("../pages/AraGraduateWithoutAvalListPage.vue"),
        meta:{
            title:"Listado de Graduados sin Aval"
        },
        layout:["Admin"]
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
