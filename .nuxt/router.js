import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5ffa7464 = () => interopDefault(import('../pages/cashier/index.vue' /* webpackChunkName: "pages/cashier/index" */))
const _0b0b52e6 = () => interopDefault(import('../pages/my-requests/index.vue' /* webpackChunkName: "pages/my-requests/index" */))
const _049077a1 = () => interopDefault(import('../pages/ocs_staff/index.vue' /* webpackChunkName: "pages/ocs_staff/index" */))
const _d2b99188 = () => interopDefault(import('../pages/personal-info/index.vue' /* webpackChunkName: "pages/personal-info/index" */))
const _2c9067aa = () => interopDefault(import('../pages/auth/callback.vue' /* webpackChunkName: "pages/auth/callback" */))
const _565b9154 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _8ec77aa0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _5ffa7464,
    name: "cashier"
  }, {
    path: "/my-requests",
    component: _0b0b52e6,
    name: "my-requests"
  }, {
    path: "/ocs_staff",
    component: _049077a1,
    name: "ocs_staff"
  }, {
    path: "/personal-info",
    component: _d2b99188,
    name: "personal-info"
  }, {
    path: "/auth/callback",
    component: _2c9067aa,
    name: "auth-callback"
  }, {
    path: "/auth/login",
    component: _565b9154,
    name: "auth-login"
  }, {
    path: "/",
    component: _8ec77aa0,
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
