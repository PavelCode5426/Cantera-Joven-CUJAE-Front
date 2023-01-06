import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import {
  is_jefe_area,
  is_joven,
  is_tutor,
} from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    name: 'planes-tutor-page',
    path: 'tutor/:id/formar',
    component: () => import('../pages/PlanesTutorPage.vue'),
    meta: {
      title: 'Planes del tutor',
      accesible: () => is_jefe_area() || is_tutor(),
    },
    layout: ['Admin'],
    props: true,
  },
  {
    name: 'plan-formacion-page',
    path: 'plan-individual/:id',
    component: () => import('../pages/PlanFormacionPage.vue'),
    meta: {
      title: 'Plan de Formacion',
      accesible: () => is_jefe_area() || is_tutor() || is_joven(),
    },
    layout: ['Admin'],
    props: true,
  },
  {
    name: 'planes-formacion-joven-page',
    path: 'joven/:id/planes-formacion-individual',
    component: () => import('../pages/PlanesFormacionJovenPage.vue'),
    meta: {
      title: 'Planes de Formacion',
      accesible: () => is_jefe_area() || is_tutor() || is_joven(),
    },
    layout: ['Admin'],
    props: true,
  },
  {
    name: 'planes-formacion-tutor-page',
    path: 'tutor/:id/planes-formacion-individual',
    component: () => import('../pages/PlanesFormacionTutorPage.vue'),
    meta: {
      title: 'Planes de Formacion',
      accesible: () => is_jefe_area() || is_tutor(),
    },
    layout: ['Admin'],
    props: true,
  },
  {
    name: 'planes-formacion-area-page',
    path: 'area/planes-formacion-individual',
    component: () => import('../pages/PlanesFormacionAreaPage.vue'),
    meta: {
      title: 'Planes de Formacion del Area',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
    // props: true,
  },
  {
    name: 'evaluaciones-page',
    path: 'evaluaciones',
    component: () => import('../pages/GestionarEvaluacionPage.vue'),
    meta: {
      title: 'Gestionar Evaluaciones de la Formacion',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
  },

]
export default routes
