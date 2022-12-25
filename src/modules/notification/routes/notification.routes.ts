import type { LayoutRouteRecordRaw } from '~/helpers/router.load'

const routes: LayoutRouteRecordRaw[] = [
  {
    path: 'notification',
    name: 'notification-page',
    component: () => import('../pages/NotificationPage.vue'),
    meta: {
      title: 'Notificaciones',
    },
    layout: ['Admin'],
  },
]
export default routes
