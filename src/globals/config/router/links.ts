import {RouteRecordRaw} from "vue-router";

export type Link = {
    name: string
    router: RouteRecordRaw | undefined,
    icon:string | undefined
    childrens: Link[] | undefined
}

const navBarLinks:Link[] = [
    {
        name:"Ajustes",
        // router:{name:'config-page'},
        icon:"entypo-gauge",
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
    // {
    //     name:"Cantera",
    //     icon:"entypo-gauge",
    //     childrens:[
    //         {
    //             name: "Conformar",
    //             icon:"entypo-gauge"
    //         }
    //     ]
    // }
]

export default navBarLinks