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
                name:'Conformar',
                router:{name:'fc-conformar'}
            }
        ]
    }
]

export default navBarLinks