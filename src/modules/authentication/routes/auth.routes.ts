import {RouteRecordRaw} from 'vue-router'

const routes:RouteRecordRaw[] = [
    {
        path: "",
        name:'login-page',
        component: () => import('../pages/LoginPage.vue'),
        meta: {
            title: "Inicio de Sesion"
        },
        layout: ["Default"]
    },
    {
        path:'api-key',
        name:'api-key-page',
        component: () => import('../pages/ApiKeyPage.vue'),
        meta:{
            title: "Gestionar Acceso"
        },
        layout:["Admin"]
    }
]

export default routes