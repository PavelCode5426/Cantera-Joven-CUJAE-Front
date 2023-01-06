import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import { is_director_recursos_humanos, is_jefe_area } from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'plantilla-aval',
    name: 'plantilla-aval-page',
    component: () => import('../pages/PlantillaAvalPage.vue'),
    meta: {
      title: 'Gestionar Plantilla de Aval',
      accesible: () => is_director_recursos_humanos(),
    },
    layout: ['Admin'],
  },
  {
    path: 'gestionar-aval',
    name: 'gestionar-aval-page',
    component: () => import('../pages/GestionarAvalPage.vue'),
    meta: {
      title: 'Gestionar Avales',
      accesible: () => is_director_recursos_humanos() || is_jefe_area(),
    },
    layout: ['Admin'],
  },
]
export default routes
