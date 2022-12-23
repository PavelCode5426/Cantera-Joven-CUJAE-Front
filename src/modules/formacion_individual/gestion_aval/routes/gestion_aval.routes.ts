import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'plantilla-aval',
    name: 'plantilla-aval-page',
    component: () => import('../pages/PlantillaAvalPage.vue'),
    meta: {

    },
    layout: ['Admin'],
  },
]
export default routes
