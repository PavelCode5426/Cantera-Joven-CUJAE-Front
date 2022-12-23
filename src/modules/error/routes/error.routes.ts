import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'error',
    name: 'server-error-page',
    component: () => import('../pages/ServerErrorPage.vue'),
    meta: {
      title: 'Ha Ocurrido un Error',
    },
    layout: ['Default'],
  },
]
export default routes
