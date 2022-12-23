import type { RouteRecordRaw } from 'vue-router'

export interface Link {
  name: string
  router: RouteRecordRaw | undefined
  icon: string | undefined
  childrens: Link[] | undefined
}

const navBarLinks: Link[] = [
  {
    name: 'Ajustes',
    childrens: [
      {
        name: 'Configuracion',
        router: { name: 'config-page' },
      },
      {
        name: 'Solicitar Acceso',
        router: { name: 'api-key-page' },
      },
      {
        name: 'Registros',
        router: { name: 'log-page' },
      },
    ],
  },

  {
    name: 'Formacion Individual',
    childrens: [
      {
        name: 'Gestion de Plantillas',
        router: { name: 'plantilla-aval-page' },
      },
    ],
  },

  {
    name: 'Conformar',
    childrens: [
      {
        name: 'Importar Estudiantes',
        router: { name: 'importar-estudiantes-page' },
      },
      {
        name: 'Importar Graduados',
        router: { name: 'importar-graduados-page' },
      },
      {
        name: 'Importar Tutores',
        router: { name: 'importar-tutores-page' },
      },
    ],
  },
]

export default navBarLinks
