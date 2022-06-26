import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from 'vue-router'
import { done, start } from 'nprogress'
import { getRoutes } from '@/helpers/router.load'

const routeModules = import.meta.globEager('/src/globals/layouts/**/*.routes.ts')
const routes: RouteRecordRaw[] = getRoutes(routeModules)

const router: RouterOptions = {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    strict: true,
}

export default router