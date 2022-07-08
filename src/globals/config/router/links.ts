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
            }
        ]
    },

    //CANTERA
    {
        name: "Cantera",
        childrens:[]
    },

    //FAMILIARIZACION
    {
        name:"Familiarizacion",
        childrens:[]
    },

    //FORMACION COMPLEMENTARIA
    {
        name:"Formacion Complementaria",
        childrens:[
            {
                name:'Conformar',
                router:{name:'fc-conformar'}
            }
        ]
    }
]

export default navBarLinks