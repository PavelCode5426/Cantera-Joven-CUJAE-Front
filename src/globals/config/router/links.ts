import type { RouteRecordRaw } from 'vue-router'
import { is_authenticated, is_director_recursos_humanos, is_jefe_area, is_tutor, is_vicerrector } from '~/globals/permissions'

export class Link {
  name: string
  router: RouteRecordRaw | undefined
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
        name: 'Gestion de Solicitudes de Tutoria',
        router: { name: 'solicitud-tutor-page' },
        is_accesible: is_jefe_area(),
      },
    ],
  },

  {
    name: 'Formacion Colectiva',
    is_accesible: is_authenticated(),

    childrens: [
      {
        name: 'Gestíon de áreas',
        router: { name: 'asignar-area-page' },
        is_accesible: is_director_recursos_humanos(),
      },
      {
        name: 'Aprobar preubicación laboral',
        router: { name: 'aprobar-preubicacion-page' },
        is_accesible: is_vicerrector(),
      },
      {
          name: 'Historial preubicación laboral',
        router: { name: 'historial-preubicacion-page' },
        is_accesible: is_director_recursos_humanos() || is_vicerrector() || is_jefe_area(),
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
