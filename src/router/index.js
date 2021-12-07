import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VConsole from 'vconsole';
new VConsole();

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
