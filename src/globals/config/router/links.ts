import {RouteRecordRaw} from "vue-router";

export interface Link {
    name: string
    router: RouteRecordRaw | undefined,
    icon:string | undefined
    childrens: Link[]
}

const navBarLinks:Link[] = [
    {
        name:"Configuracion",
        router:{name:'config-page'},
        icon:"entypo-gauge",
        childrens:[
            {
                name:'Configuracion',
                router:{name:'config-page'},
                childrens:[]
            }
        ]
    }
]

export default navBarLinks