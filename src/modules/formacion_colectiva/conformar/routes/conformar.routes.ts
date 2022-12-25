import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import { is_director_recursos_humanos } from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'importar-posibles-graduados',
    name: 'importar-posibles-graduados-page',
    component: () => import('../pages/ImportarPosiblesGraduadosPage.vue'),
    meta: {
      title: 'Importar Posibles Graduados',
      accesible: () => is_director_recursos_humanos(),
    },
    layout: ['Admin'],
  },
]
export default routes
