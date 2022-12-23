import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
