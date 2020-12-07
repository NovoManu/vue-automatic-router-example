import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default Promise.all(routes).then(routes => {
  const router = new VueRouter({
    mode: 'history',
    routes
  })

  router.beforeEach((to, from, next) => {
    if (!to.meta.middlewares) {
      return next()
    }
    const middlewares = to.meta.middlewares
    Object.keys(middlewares).forEach(middleware => {
      middlewares[middleware]({ to, from, next })
    })
    return next()
  })

  return router
})
