import {Store} from "pinia";
import {ElMessage} from 'element-plus'

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
const isServerError = (response:ServerResponse | ServerError) => response instanceof ServerError
const isAuthenticate = (response:ServerResponse | ServerError) => response instanceof ServerResponse && response.httpCode == 401

export function checkServerErrorAndRedirect(response:ServerResponse | ServerError){
    const router = useRouter()
    if (isServerError(response))
        router.push({name:'server-error-page',query:{message:response.error.message}})
}
export function checkServerErrorAndMessage(response:ServerResponse | ServerError){
    const is = isServerError(response)
    if (is)
        ElMessage.error({message:response.error.message})
    return is
}

export function checkIsAuthenticate(response:ServerResponse | ServerError){
    const router = useRouter()
    if (isAuthenticate(response))
        router.push({name:'login-page'})
}


import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import locale from "dayjs/locale/es"
import {ElMessage} from "element-plus";
dayjs.locale(locale)
dayjs.extend(relativeTime)

export function getRealativeTime(timestramp:string|undefined):string {
    return dayjs(timestramp).fromNow()
}