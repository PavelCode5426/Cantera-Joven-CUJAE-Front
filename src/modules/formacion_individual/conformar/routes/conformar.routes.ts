import type { RouteRecordRaw } from 'vue-router'
import type { LayoutRouteRecordRaw } from '../../../../helpers/router.load'
import { is_director_recursos_humanos, is_jefe_area } from '../../../../globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'importar-estudiantes',
    name: 'importar-estudiantes-page',
    component: () => import('../pages/ImportarEstudiantesPage.vue'),
    meta: {
      title: 'Importar Estudiantes',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
  },
  {
    path: 'importar-graduados',
    name: 'importar-graduados-page',
    component: () => import('../pages/ImportarGraduadosPage.vue'),
    meta: {
      title: 'Importar Graduados',
      accesible: () => is_director_recursos_humanos(),
    },
    layout: ['Admin'],
  },
  {
    path: 'importar-tutores',
    name: 'importar-tutores-page',
    component: () => import('../pages/ImportarTutoresPage.vue'),
    meta: {
      title: 'Importar Tutores',
      accesible: () => is_jefe_area(),

    },
    layout: ['Admin'],
  },
]
export default routes
