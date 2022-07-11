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
        path:'tutores/asignar',
        name:'fc-asignar-tutores',
        component:() => import("../pages/AssignTutorPage.vue"),
        meta:{
            title:"Asignar Tutores"
        },
        layout:["Admin"]
    },
    {
        path:'tutores/solicitudes',
        name:'fc-solicitudes-tutores-recibidas',
        component:() => import("../pages/ExternalTutorRequestRecivedPage.vue"),
        meta:{
            title:"Solicitud de Tutor Recibidas"
        },
        layout:["Admin"]
    },
    {
        path:'tutores/solicitudes/enviadas',
        name:'fc-solicitudes-tutores-enviadas',
        component:() => import("../pages/ExternalTutorRequestSendedPage.vue"),
        meta:{
            title:"Solicitud de Tutor Enviadas"
        },
        layout:["Admin"]
    },
    {
        path:'tutores/solicitudes/pendientes',
        name:'fc-solicitudes-tutores-pendientes',
        component:() => import("../pages/ExternalTutorRequestPendingPage.vue"),
        meta:{
            title:"Solicitud de Tutor Pendientes"
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
