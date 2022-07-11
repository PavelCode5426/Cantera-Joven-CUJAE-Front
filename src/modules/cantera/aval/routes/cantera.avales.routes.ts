import {RouteRecordRaw} from "vue-router"
import {putPrefixInRoutes} from "~/helpers/router.load"

const prefix = 'cantera/'
const routes:RouteRecordRaw[] = [

    {
        path:'estudiantes',
        name:'c-estudiantes',
        components:{
            default: () => import("@/globals/pages/GenericListPage.vue"),
            list: () => import("../components/list/AreaStudents.vue")
        },
        meta:{
            title:"Listado de Estudiantes"
        },
        props:{
            default: {
                listTitle:"Listado de Estudiantes del Area",
                listDescription:""
            }
        },
        layout:["Admin"]
    },
    {
        path:'sin-aval',
        name:'c-estudiantes-sin-aval',
        components:{
            default: () => import("@/globals/pages/GenericListPage.vue"),
            list: () => import("../components/list/AreaStudentWithoutAval.vue")
        },
        meta:{
            title:"Listado de Estudiantes sin Aval"
        },
        props:{
            default: {
                listTitle:"Listado de Estudiantes sin Aval del Area",
                listDescription:""
            }
        },
        layout:["Admin"]
    }
]

putPrefixInRoutes(prefix,routes)
export default routes
