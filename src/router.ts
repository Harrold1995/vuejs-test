import { createRouter, createWebHashHistory } from 'vue-router'
import UsersView from './views/UsersView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'users', component: UsersView },
  ],
})
