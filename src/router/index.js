import { createRouter, createWebHistory } from 'vue-router'
import ExplorerView from '../views/ExplorerView.vue'
import LookupView from '../views/LookupView.vue'
import GameView from '../views/GameView.vue'
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
      path: '/lookup',
      name: 'lookup',
      component: LookupView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/summary',
      name: 'summary',
      component: SummaryView
    }
  ]
})

export default router
