import {RouteRecordRaw} from 'vue-router'
import {getLayoutRoutes} from '@/helpers/router.load'

const requireModules = import.meta.globEager('/src/modules/**/*.routes.ts')
const childrens = getLayoutRoutes('Admin',requireModules)

const routes:RouteRecordRaw[] = [
    {
        path:'',
        component:() => import('./Admin.vue'),
        children: childrens
    }
]
export default routes