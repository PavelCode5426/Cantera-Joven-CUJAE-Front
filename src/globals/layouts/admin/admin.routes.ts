import {RouteRecordRaw} from 'vue-router'
import {getLayoutRoutes} from '@/helpers/router.load'

const requireModules = import.meta.globEager('/src/modules/**/*.routes.ts')
const childrens = getLayoutRoutes('Admin',requireModules)

childrens.push({
    path:'',
    name:'admin-page',
    component:() => import('../../pages/DefaulAdminPage.vue')
})

const routes:RouteRecordRaw[] = [
    {
        path:'/admin',
        component:() => import('./Admin.vue'),
        children: childrens
    }
]
export default routes

