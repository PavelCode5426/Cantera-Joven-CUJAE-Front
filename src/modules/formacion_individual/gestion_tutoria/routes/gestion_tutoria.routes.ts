import type { LayoutRouteRecordRaw } from '~/helpers/router.load'
import {
  is_director_recursos_humanos,
  is_estudiante,
  is_graduado,
  is_jefe_area,
  is_joven,
  is_tutor,
} from '~/globals/permissions'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'asignar-tutores',
    name: 'asignar-tutores-page',
    component: () => import('../pages/AsignarTutorPage.vue'),
    meta: {
      title: 'Gestionar Tutores del Area',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
  },
  {
    path: 'solicitud-tutor',
    name: 'solicitud-tutor-page',
    component: () => import('../pages/SolicitudesTutorPage.vue'),
    meta: {
      title: 'Solicitudes de Tutoria',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
  },
  {
    path: 'area/:id/tutores',
    name: 'tutores-area-page',
    component: () => import('../pages/TutoresAreaPage.vue'),
    meta: {
      title: 'Solicitudes de Tutoria',
      accesible: () => is_jefe_area(),
    },
    layout: ['Admin'],
  },
  {
    path: 'tutor/:id/tutorados',
    name: 'tutorados-asignados-page',
    props: true,
    component: () => import('../pages/TutoradosPorTutorPage.vue'),
    meta: {
      title: 'Tutorados por tutor',
      accesible: () => is_jefe_area() || is_tutor(),
    },
    layout: ['Admin'],
  },
  {
    path: 'joven/:id/tutores',
    name: 'tutores-asignados-page',
    props: true,
    component: () => import('../pages/TutoresPorTutoradoPage.vue'),
    meta: {
      title: 'Tutores por joven',
      accesible: () => is_jefe_area() || is_tutor() || is_joven(),
    },
    layout: ['Admin'],
  },
]
export default routes
