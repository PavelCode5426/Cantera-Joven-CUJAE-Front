import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import {
    is_jefe_area,
    is_joven,
    is_director_recursos_humanos,
} from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
    {
        name: 'planes-formacion-colectiva-page',
        path: 'planes-colectivos',
        component: () => import('../pages/PlanesFormacionColectivaPage.vue'),
        meta: {
            title: 'Planes del tutor',
            accesible: () => is_jefe_area() || is_director_recursos_humanos(),
        },
        layout: ['Admin'],
        props: true,
    },
    {
        name: 'plan-formacion-colectiva-page',
        path: 'plan-colectivo/:id',
        component: () => import('../pages/PlanesFormacionColectivaPage.vue'),
        meta: {
            title: 'Plan de Formacion',
            accesible: () => is_jefe_area() || is_director_recursos_humanos(),
        },
        layout: ['Admin'],
        props: true,
    },

]
export default routes
