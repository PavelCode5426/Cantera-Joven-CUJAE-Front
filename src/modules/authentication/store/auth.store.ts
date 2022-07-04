import {defineStore} from "pinia"

export type authModel = {
    isAuthenticated:boolean
    id:number | undefined
    username:string | undefined
    first_name:string | undefined
    last_name:string | undefined
    email:string | undefined
    token:string | undefined
}
const initialState:authModel = {
    isAuthenticated:false,
    id:undefined,
    username:undefined,
    first_name:undefined,
    last_name:undefined,
    email:undefined,
    token:undefined,
}

const authStore = defineStore('auth',{
    state:() => Object.create(initialState),
    actions: {
        setAttr(data:authModel) {
            Object.keys(data).forEach(i => this[i] = data[i])
            this.isAuthenticated = this.id !== undefined
        },
        reset: () => {
           console.log("Metodo Reset no funciona") //TODO ARREGLAR
        },
    },
    getters: {

    }
})
export default authStore
