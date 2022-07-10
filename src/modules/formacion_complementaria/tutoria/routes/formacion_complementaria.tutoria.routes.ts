import {RouteRecordRaw} from "vue-router"
import {putPrefixInRoutes} from "~/helpers/router.load"

const prefix = 'formacion-complementaria/'
const routes:RouteRecordRaw[] = [
    {
        path:'tutores',
        name:'fc-tutores',
        components:{
            default: () => import("@/globals/pages/GenericListPage.vue"),
            list: () => import("../components/list/AraTutorList.vue")
        },
        meta:{
            title:"Listado de Tutores"
        },
        props:{
            default: {
                listTitle:"Listado de Tutores del Area",
                listDescription:""
            }
        },
        layout:["Admin"]
    },
    {
        path:'graduados',
        name:'fc-graduados',
        components:{
            default: () => import("@/globals/pages/GenericListPage.vue"),
            list: () => import("../components/list/AraGraduateList.vue")
        },
        meta:{
            title:"Listado de Graduados"
        },
        props:{
            default: {
                listTitle:"Listado de Graduados del Area",
                listDescription:""
            }
        },
        layout:["Admin"]
    },
    {
        path:'sin-aval',
        name:'fc-graduados-sin-aval',
        components:{
            default: () => import("@/globals/pages/GenericListPage.vue"),
            list: () => import("../components/list/AraGraduateWithoutAvalList.vue")
        },
        meta:{
            title:"Listado de Graduados sin Aval"
        },
        props:{
            default: {
                listTitle:"Listado de Graduados sin Aval del Area",
                listDescription:""
            }
        },
        layout:["Admin"]
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
