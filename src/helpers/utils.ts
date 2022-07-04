import {Store} from "pinia";

export function putStoreinLocalStorage(store:Store)
{
    const local = JSON.parse(localStorage.getItem(store.$id))
    if (local)
        store.$state = local

    localStorage.removeItem(store.$id)
    useLocalStorage(store.$id,store.$state)
}

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import locale from "dayjs/locale/es"
dayjs.locale(locale)
dayjs.extend(relativeTime)

export function getRealativeTime(timestramp:string):string{
    return dayjs(timestramp).fromNow()
}