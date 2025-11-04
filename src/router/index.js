import { createRouter, createWebHistory } from 'vue-router'
import ExplorerView from '../views/ExplorerView.vue'
import SummaryView from '../views/SummaryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/explorer'
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: ExplorerView
    },
    {
      path: '/summary',
      name: 'summary',
      component: SummaryView
    }
  ]
})

export default router
