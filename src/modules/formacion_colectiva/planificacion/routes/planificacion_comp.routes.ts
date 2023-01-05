import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import {
    is_director_recursos_humanos,
    is_jefe_area,
    is_vicerrector,
} from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
    {
        name: 'planes-formacion-colectiva',
        path: 'planes-formacion-colectiva',
        component: () => import('../pages/PlanesFormacionColectivaPage.vue'),
        meta: {
            title: 'Posibles graduados preubicados',
            accesible: () => is_jefe_area() || is_director_recursos_humanos() || is_vicerrector(),
        },
        layout: ['Admin'],
        props: true,
    },
    {
        name: 'plan-formacion-colectiva-page',
        path: 'plan-colectivo/:id',
        component: () => import('../pages/PlanFormacionColectivaPage.vue'),
        meta: {
            title: 'Plan de Formación Colectivo',
            accesible: () => is_jefe_area() || is_director_recursos_humanos() || is_vicerrector(),
        },
        layout: ['Admin'],
        props: true,
    },
    {
        path: 'posibles-graduados-evaluacion',
        name: 'posibles-graduados-familiarizados-page',
        component: () => import('../pages/PosiblesGraduadosFamiliarizadosPage.vue'),
        meta: {
            title: 'Evaluar asistencia de posible graduado',
            accesible: () => is_jefe_area(),
        },
        layout: ['Admin'],
    },

]
export default routes
