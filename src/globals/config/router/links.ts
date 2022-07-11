import {RouteRecordRaw} from "vue-router";

export type Link = {
    name: string
    router: RouteRecordRaw | undefined,
    icon:string | undefined
    childrens: Link[] | undefined
}

const navBarLinks:Link[] = [
    //AJUSTES
    {
        name:"Ajustes",
        childrens:[
            {
                name:'Configuracion',
                router:{name:'config-page'}
            },
            {
                name:'Solicitar Acceso',
                router:{name: 'api-key-page'}
            },
            {
                name:'Registros',
                router:{name: 'log-page'}
            }
        ]
    },

    //CANTERA
    {
        name: "Cantera",
        childrens:[
            {
                name:'Conformar',
                router:{name:'c-conformar'}
            }
        ]
    },

    //FAMILIARIZACION
    {
        name:"Familiarizacion",
        childrens:[
            {
                name:'Conformar',
                router:{name:'f-conformar'}
            }
        ]
    },

    //FORMACION COMPLEMENTARIA
    {
        name:"Formacion Complementaria",
        childrens:[
            {
                name: 'Reportes',
                childrens:[
                    {
                        name:'Tutores del Area',
                        router:{name:'fc-tutores'}
                    },
                    {
                        name:'Graduados del Area',
                        router:{name:'fc-graduados'}
                    },
                    {
                        name:'Graduados sin Aval',
                        router:{name: 'fc-graduados-sin-aval'}
                    }
                ]
            },
            {
              name:'Asignar Tutores',
              router: {name:'fc-asignar-tutores'}
            },
            {
                name:'Solicitudes de Tutores',
                childrens:[
                    {
                        name: "Solicitudes Enviadas",
                        router:{name:'fc-solicitudes-tutores-enviadas'}
                    },
                    {
                        name: "Solicitudes Recibidas",
                        router:{name:'fc-solicitudes-tutores-recibidas'}
                    },
                    {
                        name: "Solicitudes Pendientes",
                        router:{name:'fc-solicitudes-tutores-pendientes'}
                    }
                ]
            },
            {
                name:'Conformar',
                router:{name:'fc-conformar'}
            }
        ]
    }
]

export default navBarLinks