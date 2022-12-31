import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import {
  is_jefe_area,
  is_joven,
  is_tutor,
} from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    name: 'planes-tutor-page',
    path: 'tutor/:id/planes',
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
    path: 'plan-formacion/:id',
    component: () => import('../pages/PlanFormacionPage.vue'),
    meta: {
      title: 'Plan de Formacion',
      accesible: () => is_jefe_area() || is_tutor() || is_joven(),
    },
    layout: ['Admin'],
    props: true,
  },

]
export default routes
