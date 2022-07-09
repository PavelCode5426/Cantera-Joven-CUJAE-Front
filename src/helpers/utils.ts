import {Store} from "pinia";
import {ElMessage} from 'element-plus'

export function putStoreinLocalStorage(store:Store){
    const local = JSON.parse(localStorage.getItem(store.$id))
    if (local)
        store.$state = local

    localStorage.removeItem(store.$id)
    useLocalStorage(store.$id,store.$state)
}

import {ServerError, ServerResponse} from "@/globals/config/axios"
import {useRouter} from "vue-router";
import authStore,{initialState} from "@/modules/authentication/store/auth.store";
export const isServerError = (response:ServerResponse | ServerError) => response instanceof ServerError
export const isAuthenticate = (response:ServerResponse | ServerError) => response instanceof ServerResponse && response.httpCode != 401

export function checkServerErrorAndRedirect(response:ServerResponse | ServerError){
    let is = isServerError(response)
    const router = useRouter()
    if (is)
        router.push({name: 'server-error-page', query: {message: response.error.message}})
    return is
}
export function checkServerErrorAndMessage(response:ServerResponse | ServerError){
    const is = isServerError(response)
    if (is)
        ElMessage.error({message:response.error.message})
    return is
}
export function checkIsAuthenticateAndRedirect(response:ServerResponse | ServerError){
    let is = isAuthenticate(response)
    const router = useRouter()
    if (!is)
        router.push({name: 'login-page'})
    return is
}
export function checkIsAuthenticateAndChangeStorage(response:ServerResponse | ServerError){
    let is = isAuthenticate(response)
    if (!is) {
        const auth = authStore()
        auth.setAttr(initialState)
    }
    return is
}

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import locale from "dayjs/locale/es"
dayjs.locale(locale)
dayjs.extend(relativeTime)

export function getRealativeTime(timestramp:string|undefined):string {
    return dayjs(timestramp).fromNow()
}