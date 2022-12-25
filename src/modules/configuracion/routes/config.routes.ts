import { is_director_recursos_humanos } from '~/globals/permissions'
import type { LayoutRouteRecordRaw } from '~/helpers/router.load'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'configuracion',
    name: 'config-page',
    component: () => import('../pages/ConfigurationPage.vue'),
    meta: {
      title: 'Configuracion del Sistema',
      accesible: () => (is_director_recursos_humanos()),
    },
    layout: ['Admin'],
  },
]
export default routes
