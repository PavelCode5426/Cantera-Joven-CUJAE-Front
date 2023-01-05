import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import { is_director_recursos_humanos, is_jefe_area } from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'propuestas-movimiento',
    name: 'gestionar-propuestas-movimiento-page',
    component: () => import('../pages/PropuestaMovimientoPage.vue'),
    meta: {
      title: 'Gestionar Propuestas de Movimiento',
      accesible: () => is_director_recursos_humanos(),
    },
    layout: ['Admin'],
  },
]
export default routes
