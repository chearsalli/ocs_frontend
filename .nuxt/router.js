import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4d0825fc = () => interopDefault(import('../pages/cashier/index.vue' /* webpackChunkName: "pages/cashier/index" */))
const _7036787e = () => interopDefault(import('../pages/my-requests/index.vue' /* webpackChunkName: "pages/my-requests/index" */))
const _360fb98e = () => interopDefault(import('../pages/ocs_staff/index.vue' /* webpackChunkName: "pages/ocs_staff/index" */))
const _5d9b56d4 = () => interopDefault(import('../pages/personal-info/index.vue' /* webpackChunkName: "pages/personal-info/index" */))
const _199e1942 = () => interopDefault(import('../pages/auth/callback.vue' /* webpackChunkName: "pages/auth/callback" */))
const _550d06bc = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _65e10c48 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cashier",
    component: _4d0825fc,
    name: "cashier"
  }, {
    path: "/my-requests",
    component: _7036787e,
    name: "my-requests"
  }, {
    path: "/ocs_staff",
    component: _360fb98e,
    name: "ocs_staff"
  }, {
    path: "/personal-info",
    component: _5d9b56d4,
    name: "personal-info"
  }, {
    path: "/auth/callback",
    component: _199e1942,
    name: "auth-callback"
  }, {
    path: "/auth/login",
    component: _550d06bc,
    name: "auth-login"
  }, {
    path: "/",
    component: _65e10c48,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
