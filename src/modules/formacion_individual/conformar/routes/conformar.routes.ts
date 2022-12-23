import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'importar-estudiantes',
    name: 'importar-estudiantes-page',
    component: () => import('../pages/ImportarEstudiantesPage.vue'),
    layout: ['Admin'],
  },
  {
    path: 'importar-graduados',
    name: 'importar-graduados-page',
    component: () => import('../pages/ImportarGraduadosPage.vue'),
    layout: ['Admin'],
  },
  {
    path: 'importar-tutores',
    name: 'importar-tutores-page',
    component: () => import('../pages/ImportarTutoresPage.vue'),
    layout: ['Admin'],
  },
]
export default routes
