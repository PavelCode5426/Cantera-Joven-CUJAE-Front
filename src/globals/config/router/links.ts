import type { RouteRecordRaw } from 'vue-router'

export interface Link {
  name: string
  router: RouteRecordRaw | undefined
  icon: string | undefined
  childrens: Link[] | undefined
  data_test: String | undefined
}

const navBarLinks: Link[] = [
  // AJUSTES
  {
    name: 'Ajustes',
    data_test: 'nav-item-ajustes',
    childrens: [
      {
        name: 'Configuracion',
        router: { name: 'config-page' },
        data_test: 'nav-item-config',
      },
      {
        name: 'Solicitar Acceso',
        router: { name: 'api-key-page' },
        data_test: 'nav-item-api-key',
      },
      {
        name: 'Registros',
        router: { name: 'log-page' },
        data_test: 'nav-item-registros',
      },
    ],
  },

  // CANTERA
  {
    name: 'Cantera',
    data_test: 'nav-item-cantera',
    childrens: [
      {
        name: 'Reportes',
        data_test: 'nav-item-reportes',
        childrens: [
          {
            name: 'Estudiantes del Area',
            router: { name: 'c-estudiantes' },
            data_test: 'nav-item-estudiantes-del-area',
          },
          {
            name: 'Estudiantes sin Aval',
            router: { name: 'c-estudiantes-sin-aval' },
            data_test: 'nav-item-estudiantes-sin-aval',
          },
        ],
      },
      {
        name: 'Conformar',
        router: { name: 'c-conformar' },
        data_test: 'nav-item-c-conformar',
      },
    ],
  },

  // FAMILIARIZACION
  {
    name: 'Familiarizacion',
    data_test: 'nav-item-familiarizacion',
    childrens: [
      {
        name: 'Conformar',
        router: { name: 'f-conformar' },
        data_test: 'nav-item-f-conformar',
      },
      {
        name: 'Asignar Areas',
        router: { name: 'f-asignar-areas' },
        data_test: 'nav-item-f-asignar-areas',
      },
    ],
  },

  // FORMACION COMPLEMENTARIA
  {
    name: 'Formacion Complementaria',
    data_test: 'nav-item-formacion-complementaria',
    childrens: [
      {
        name: 'Reportes',
        childrens: [
          {
            name: 'Tutores del Area',
            router: { name: 'fc-tutores' },
          },
          {
            name: 'Graduados del Area',
            router: { name: 'fc-graduados' },
          },
          {
            name: 'Graduados sin Aval',
            router: { name: 'fc-graduados-sin-aval' },
          },
        ],
      },
      {
        name: 'Asignar Tutores',
        router: { name: 'fc-asignar-tutores' },
        data_test: 'nav-item-fc-asignar-tutores',
      },
      {
        name: 'Solicitudes de Tutores',
        childrens: [
          {
            name: 'Solicitudes Enviadas',
            router: { name: 'fc-solicitudes-tutores-enviadas' },
          },
          {
            name: 'Solicitudes Recibidas',
            router: { name: 'fc-solicitudes-tutores-recibidas' },
          },
          {
            name: 'Solicitudes Pendientes',
            router: { name: 'fc-solicitudes-tutores-pendientes' },
          },
        ],
      },
      {
        name: 'Conformar',
        router: { name: 'fc-conformar' },
        data_test: 'nav-item-fc-conformar',
      },
    ],
  },
]

export default navBarLinks
