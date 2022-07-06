import {Store} from "pinia";

export function putStoreinLocalStorage(store:Store)
{
    const local = JSON.parse(localStorage.getItem(store.$id))
    if (local)
        store.$state = local

    localStorage.removeItem(store.$id)
    useLocalStorage(store.$id,store.$state)
}

import {ServerError, ServerResponse} from "@/globals/config/axios"
import {useRouter} from "vue-router";
export function checkServerError(response:ServerResponse | ServerError){
    const router = useRouter()
    if (response instanceof ServerError)
        router.push({name:'server-error-page',query:{message:response.error.message}})
}

export function checkIsAuthenticate(response:ServerResponse | ServerError){
    const router = useRouter()
    if (response instanceof ServerResponse && response.httpCode == 401)
        router.push({name:'login-page'})
}


import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import locale from "dayjs/locale/es"
dayjs.locale(locale)
dayjs.extend(relativeTime)

export function getRealativeTime(timestramp:string|undefined):string {
    return dayjs(timestramp).fromNow()
}