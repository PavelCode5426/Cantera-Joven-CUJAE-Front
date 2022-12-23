import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'api-key',
    name: 'api-key-page',
    component: () => import('../pages/ApiKeyPage.vue'),
    meta: {
      title: 'Gestionar Acceso',
    },
    layout: ['Admin'],
  },
]

export default routes
