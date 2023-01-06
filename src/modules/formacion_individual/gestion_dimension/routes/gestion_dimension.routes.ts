import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import { is_director_recursos_humanos, is_jefe_area } from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'dimension',
    name: 'gestionar-dimension-page',
    component: () => import('../pages/DimensionPage.vue'),
    meta: {
      title: 'Gestionar Dimensiones',
      accesible: () => is_director_recursos_humanos(),
    },
    layout: ['Admin'],
  },
]
export default routes
