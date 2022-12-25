import type { LayoutRouteRecordRaw } from '../../../helpers/router.load'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'registros',
    name: 'log-page',
    component: () => import('../pages/LogsPage.vue'),
    meta: {
      title: 'Registros en el Sistema',
    },
    layout: ['Admin'],
  },
]
export default routes
