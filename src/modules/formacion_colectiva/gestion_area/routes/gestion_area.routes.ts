import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import {is_director_recursos_humanos, is_jefe_area, is_vicerrector} from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
    {
        path: 'asignar-areas',
        name: 'asignar-area-page',
        component: () => import('../pages/AsignarAreaPage.vue'),
        meta: {
            title: 'Gestionar áreas del posible graduado',
            accesible: () => is_director_recursos_humanos(),
        },
        layout: ['Admin'],
    },
    {
        path: 'aprobar-preubicacion',
        name: 'aprobar-preubicacion-page',
        component: () => import('../pages/AprobarPreubicacionLaboralPage.vue'),
        meta: {
            title: 'Aprobar preubicación laboral',
            accesible: () => is_vicerrector(),
        },
        layout: ['Admin'],
    },
    {
        path: 'posibles-graduados',
        name: 'historial-preubicacion-page',
        component: () => import('../pages/HistorialPreubicacionPGPage.vue'),
        meta: {
            title: 'Historial de preubicación laboral posible graduado',
            accesible: () => is_director_recursos_humanos() || is_vicerrector() || is_jefe_area(),
        },
        layout: ['Admin'],
    },
    {
        path: 'posibles-graduados/:id/historial-preubicacion',
        name: 'historial-preubicacion-posible-graduado-page',
        component: () => import('../pages/HistorialPreubicacionesPage.vue'),
        meta: {
            title: 'Historial de preubicaciones laborales de un posible graduado',
            accesible: () => is_director_recursos_humanos() || is_vicerrector() || is_jefe_area(),
        },
        layout: ['Admin'],
    },
    {
        path: 'area/:id/posibles-graduados',
        name: 'preubicados-area-page',
        component: () => import('../pages/PreubicadosAreaPage.vue'),
        meta: {
            title: 'Posibles graduados preubicados en el área',
            accesible: () => is_jefe_area(),
        },
        layout: ['Admin'],
    },
]
export default routes
