import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { dashboardRoutes } from './modules/home'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DashboardShell.vue'),
    children: dashboardRoutes
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/Views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
