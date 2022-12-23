import NProgress from 'nprogress'
import { type UserModule } from '~/types/types'
import siteStore from '@/globals/stores/site.store'
import authStore from '@/modules/authentication/store/auth.store'
export function start() {
  NProgress.start()
}
export function done() {
  siteStore().isLoading = false
  NProgress.done()
}

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from, next) => {
      // if (to.path !== from.path){
      if (!siteStore().isLoading)
        start()
      if (!authStore().isAuthenticated && to.name !== 'login-page')
        return next({ name: 'login-page' })
      else if (authStore().isAuthenticated && to.name === 'login-page')
        return next({ name: 'admin-page' })
      else
        next()
      // }
    })
    router.afterEach((to, from) => {
      siteStore().title = to.meta.title ? to.meta.title : 'Cantera Joven CUJAE'
      setTimeout(done, 400)
    })
  }
}
