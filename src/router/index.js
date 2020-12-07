import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default Promise.all(routes).then(routes => {
  console.log(routes)
  return  new VueRouter({
    mode: 'history',
    routes
  })
})
