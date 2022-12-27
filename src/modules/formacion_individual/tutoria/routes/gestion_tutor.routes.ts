import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import { is_director_recursos_humanos, is_jefe_area } from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'asignar-tutores',
    name: 'asignar-tutores-page',
    component: () => import('../pages/AsignarTutorPage.vue'),
    meta: {
      title: 'Gestionar Tutores del Area',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
  },
  {
    path: 'solicitud-tutor',
    name: 'solicitud-tutor-page',
    component: () => import('../pages/SolicitudesTutorPage.vue'),
    meta: {
      title: 'Solicitudes de Tutoria',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
  },
]
export default routes
