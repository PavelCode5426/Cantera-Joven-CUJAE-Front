import { is_estudiante, is_graduado, is_posible_graduado, is_superuser } from '~/globals/permissions'
import type { DefaultRouterMeta, LayoutRouteRecordRaw } from '~/helpers/router.load'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'api-key',
    name: 'api-key-page',
    component: () => import('../pages/ApiKeyPage.vue'),
    meta: {
      title: 'Gestionar Acceso',
      accesible: () => !(is_graduado() || is_posible_graduado() || is_estudiante()) || is_superuser(),
    },
    layout: ['Admin'],
  },
]

export default routes
