import type { RouteRecordRaw } from 'vue-router'
import type { LayoutRouteRecordRaw } from '~/helpers/router.load'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'error',
    name: 'server-error-page',
    component: () => import('../pages/ServerErrorPage.vue'),
    meta: {
      title: 'Error Inesperado',
    },
    layout: ['Default'],
  },
  {
    path: 'error',
    name: 'acceso-denegado-page',
    component: () => import('../pages/AccesoDenegado.vue'),
    meta: {
      title: 'Acceso Denegado',
    },
    layout: ['Admin'],
  },
]
export default routes
