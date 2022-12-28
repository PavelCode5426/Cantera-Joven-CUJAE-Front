import type { Store } from 'pinia'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/es'
import { ExceptionResponse, ServerError } from '@/globals/config/axios'
import type { Response } from '@/globals/config/axios'
import authStore, { initialState } from '@/modules/authentication/store/auth.store'
import AuthStore from '@/modules/authentication/store/auth.store'

const router = useRouter()

export function putStoreinLocalStorage(store: Store) {
  const local = JSON.parse(localStorage.getItem(store.$id))
  if (local)
    store.$state = local

  localStorage.removeItem(store.$id)
  useLocalStorage(store.$id, store.$state)
}

export const isServerError = (response: Response) => response instanceof ServerError
export const isExceptionResponse = (response: Response) => response instanceof ExceptionResponse
export const isAuthenticate = (response: Response) => response.httpCode != 401

export function checkServerErrorAndRedirect(response: Response) {
  const is = isServerError(response)
  if (is)
    router.push({ name: 'server-error-page', query: { message: response.error.message } })
  return is
}
export function checkServerErrorAndMessage(response: Response) {
  const is = isServerError(response)
  if (is)
    ElMessage.error({ message: response.error.message })
  return is
}
export function checkIsAuthenticateAndRedirect(response: Response) {
  const is = !isAuthenticate(response)
  // const router = useRouter()
  if (is) {
    authStore().$patch({ isAuthenticated: false })
    router.push({ name: 'login-page' })
  }

  return is
}
export function checkIsAuthorizedAndRedirect(response: Response) {
  const is = !isAuthenticate(response) && response.httpCode === 403
  // const router = useRouter()
  if (is)
    router.push({ name: 'acceso-denegado-page' })

  return is
}
export function checkIsAuthenticateAndChangeStorage(response: Response) {
  const is = isAuthenticate(response)
  if (!is)
    authStore().$patch({ isAuthenticated: false })

  return is
}

dayjs.locale(locale)
dayjs.extend(relativeTime)

export function getRealativeTime(timestramp: string | undefined): string {
  return dayjs(timestramp).fromNow()
}

export function get_current_id() {
  return AuthStore().user?.id
}

export function get_current_area_id() {
  return AuthStore().user?.area?.id
}
