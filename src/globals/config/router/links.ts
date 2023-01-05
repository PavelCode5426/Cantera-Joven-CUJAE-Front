import type { RouteRecordRaw } from 'vue-router'
import {
  is_authenticated,
  is_director_recursos_humanos,
  is_jefe_area,
  is_joven,
  is_tutor,
  is_vicerrector,
} from '~/globals/permissions'
import { get_current_area_id, get_current_id } from '~/helpers/utils'

interface RouterLink {
  name: string
  params?: object
  query?: object
}

export class Link {
  name: string
  router: RouterLink | undefined
  icon: string | undefined
  childrens: Link[] | undefined
  is_accesible: boolean
}

const navBarLinks: Link[] = [
  {
    name: 'Ajustes',
    is_accesible: is_authenticated(),
    childrens: [
      {
        name: 'Configuracion',
        router: { name: 'config-page' },
        is_accesible: is_director_recursos_humanos(),
      },
      {
        name: 'Solicitar Acceso',
        router: { name: 'api-key-page' },
        is_accesible: is_director_recursos_humanos() || is_vicerrector() || is_jefe_area() || is_tutor(),

      },
      {
        name: 'Registros',
        router: { name: 'log-page' },
        is_accesible: true,
      },
    ],
  },

  {
    name: 'Formacion Individual',
    is_accesible: is_authenticated(),
    childrens: [
      {
        name: 'Gestion de Plantillas',
        router: { name: 'plantilla-aval-page' },
        is_accesible: is_director_recursos_humanos(),
      },
      {
        name: 'Gestion de Avales',
        router: { name: 'gestionar-aval-page' },
        is_accesible: is_director_recursos_humanos() || is_jefe_area(),
      },
      {
        name: 'Gestion de Tutores',
        router: { name: 'asignar-tutores-page' },
        is_accesible: is_jefe_area(),
      },
      {
        name: 'Tutores del Area',
        router: { name: 'tutores-area-page', params: { id: get_current_area_id() } },
        is_accesible: is_jefe_area(),
      },
      {
        name: 'Tutorados asignados',
        router: { name: 'tutorados-asignados-page', params: { id: get_current_id () } },
        is_accesible: is_jefe_area() || is_tutor(),
      },
      {
        name: 'Tutores asignados',
        router: { name: 'tutores-asignados-page', params: { id: get_current_id () } },
        is_accesible: is_joven(),
      },
      {
        name: 'Gestion de Solicitudes de Tutoria',
        router: { name: 'solicitud-tutor-page' },
        is_accesible: is_jefe_area(),
      },
      {
        name: 'Planificar Formacion',
        router: { name: 'planes-tutor-page', params: { id: get_current_id() } },
        is_accesible: is_tutor(),
      },
      {
        name: 'Planes de Formacion (JOVEN)',
        router: { name: 'planes-formacion-joven-page', params: { id: get_current_id() } },
        is_accesible: is_joven(),
      },
      {
        name: 'Planes de Formacion (TUTOR)',
        router: { name: 'planes-formacion-tutor-page', params: { id: get_current_id() } },
        is_accesible: is_tutor(),
      },
      {
        name: 'Planes de Formacion del Area (JEFE AREA)',
        router: { name: 'planes-formacion-area-page', params: { id: get_current_id() } },
        is_accesible: is_jefe_area(),
      },
      {
        name: 'Revisar Evaluaciones',
        router: { name: 'evaluaciones-page' },
        is_accesible: is_jefe_area(),
      },
    ],
  },

  {
    name: 'Conformar',
    is_accesible: is_authenticated(),
    childrens: [
      {
        name: 'Importar Estudiantes',
        router: { name: 'importar-estudiantes-page' },
        is_accesible: is_jefe_area(),

      },
      {
        name: 'Importar Graduados',
        router: { name: 'importar-graduados-page' },
        is_accesible: is_director_recursos_humanos(),

      },
      {
        name: 'Importar Tutores',
        router: { name: 'importar-tutores-page' },
        is_accesible: is_jefe_area(),
      },
      {
        name: 'Importar Posibles Graduados',
        router: { name: 'importar-posibles-graduados-page' },
        is_accesible: is_director_recursos_humanos(),

      },
    ],
  },
]

export default navBarLinks
