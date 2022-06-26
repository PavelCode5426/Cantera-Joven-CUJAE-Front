import {RouteRecordRaw} from 'vue-router'

const routes:RouteRecordRaw[] = [
    {
        path: 'login',
        component: () => import('../pages/LoginPage.vue'),
        // layout: ['Default','Admin']
        layout: ['Admin']
    }
]

export default routes