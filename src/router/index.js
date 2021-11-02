import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    component: (resolve) => require(['@/Home'], resolve),
    name: 'Home',
  },
  {
    path: '/hello',
    component: (resolve) => require(['@/components/HelloWorld'], resolve),
    name: 'hello',
  },
  {
    path: '/dynamic',
    component: (resolve) => require(['@/components/Dynamic'], resolve),
    name: 'dynamic',
  },
  {
    path: '/test',
    component: (resolve) => require(['@/components/Test'], resolve),
    name: 'test',
  },
  {
    path: '/collapse',
    component: (resolve) => require(['@/components/Collapse'], resolve),
    name: 'collapse',
  },
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
})
