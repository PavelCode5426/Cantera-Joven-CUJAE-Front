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
    }
]

export default routes